/*
 * @Author: taijingming
 * @Date: 2025-06-28 22:03:40
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-28 22:03:53
 * @FilePath: \vue-learning\src\views\effect1.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
// 全局的变量 临时保存依赖
let activeEffect = null
// 存储依赖 数据结构 weakMap: key: target对象，value 是个map: key：target的key,value：Set
const targetMap = new WeakMap()

export function effect(fn) {
  const effectFn = () => {
    activeEffect = effectFn
    fn()
  }
  effectFn()
}

// 触发get时 进行依赖收集
export function track(target, key) {
  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  if (!activeEffect.deps) {
    activeEffect.deps = []
  }
  deps.add(activeEffect)
  activeEffect.deps.push(deps)
}

// 属性修改时 触发依赖跟新
export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)
  if (!deps) return
  console.log('[trigger] deps', target, key, deps)
  const set = new Set(deps)
  set.forEach((effect) => effect())
}

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      const res = Reflect.get(target, key)
      track(target, key) // 依赖收集
      return res
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value)
      trigger(target, key) // 更新
      return res
    }
  })
}