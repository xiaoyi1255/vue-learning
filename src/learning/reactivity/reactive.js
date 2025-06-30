/*
 * @Author: taijingming
 * @Date: 2025-06-28 16:06:48
 * @LastEditors: 静ming
 * @LastEditTime: 2025-06-30 23:34:25
 * @FilePath: \vue-learning\src\learning\reactivity\reactive.js
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { create } from 'domain'
import { track, trigger } from './effect'


export const ITERATE_KEY = Symbol('iterate')
// TODO: Export your reactive API here, for example:
export function reactive(target) {
  // implementation goes here
  return createReactive(target)
}

export function shallowReactive(target) {
  return createReactive(target, true)
}
export function readonly(target) {
  return createReactive(target, false, true)
}

/** * 创建响应式对象
 * @param {Object} target - 目标对象
 * @param {boolean} isReadonly - 是否只读 
 * @param {boolean} isShallow - 是否浅响应
 * @returns {Proxy} - 响应式对象
 */
function createReactive(target, isShallow = false, isReadonly = false, ) {
  return new Proxy(target, {
    get(target, key) {

      if (key === 'raw') { // 区分 访问到原型属性，避免收集原型对象的依赖
        return target // 返回原始对象
      }
      // 依赖收集
      if(!isReadonly) { // 只读不需要依赖收集
        track(target, key)
      }
      const res = Reflect.get(target, key)
      if (isShallow) {
        // 浅层响应式，直接返回值
        return res
      }
      // 如果获取的值是对象，递归创建响应式 
      if (typeof res === 'object' && res !== null) {
        return isReadonly ? isReadonly(res) : createReactive(res)
      }
      return res
    },
    set(target, key, value, receiver) {
      if (isReadonly) {
        console.warn(`Cannot set property ${key} of readonly object`)
        return true // 只读对象不允许修改属性，返回true表示操作成功
      }
      const oldValue = target[key]
      const res = Reflect.set(target, key, value, receiver)
      // 判断 操作类型 =>  新增、修改
      const type = Object.prototype.hasOwnProperty.call(target, key) ? 'SET' : 'ADD'
      // 避免 访问的属性不存在， 访问到原型上的属性， 原型又是响应式的情况
      if (target === receiver.raw) {
        if (oldValue !== value && oldValue === oldValue || value === value) {
          // 只有当新旧值不相等时才触发更新
          // 这里使用了 NaN 的特殊处理，因为 NaN !== NaN
          trigger(target, key, type)
        }
      }
      return res
    },
    deleteProperty(target, key) {
      if (isReadonly) {
        console.warn(`Cannot delete property ${key} of readonly object`)
        return true // 只读对象不允许删除属性，返回true表示操作成功
        
      }
      const res = Reflect.deleteProperty(target, key)
      // 触发依赖更新
      trigger(target, key, 'DELETE')
      return res
    },
    ownKeys(target) {
      // 处理 Object.keys() for...in 等方法
      track(target, ITERATE_KEY)
      return Reflect.ownKeys(target)
    }
  })

}


