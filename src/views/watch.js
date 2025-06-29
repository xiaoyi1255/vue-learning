/*
 * @Author: taijingming
 * @Date: 2025-06-29 09:47:27
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-29 15:12:59
 * @FilePath: \vue-learning\src\views\watch.js
 * @Description: JavaScript版本的watch实现
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { effect } from './effect'

/**
 * watch函数 - 监听响应式数据的变化
 * @param {Function|Object} source - 要监听的数据源
 * @param {Function} cb - 回调函数
 * @param {Object} options - 配置选项
 * @param {boolean} options.immediate - 是否立即执行
 * @param {boolean|number} options.deep - 是否深度监听，数字表示监听层数
 * @param {string} options.flush - 执行时机：'pre' | 'post' | 'sync'
 * @param {boolean} options.once - 是否只执行一次
 * @returns {Function} 返回停止监听的函数
 */
export function watch(source, cb, options = {}) {
  let getter
  if (typeof source === 'function') {
    // 当 source 是函数时，需要包装一下以支持 deep 选项
    if (options.deep) {
      getter = () => traverse(source(), options.deep)
    } else {
      getter = source
    }
  } else {
    // 修复：traverse 应该返回一个 getter 函数
    getter = () => traverse(source, options.deep)
  }

  let oldValue
  let newValue
  let cleanup // 存放过期回调

  // 定义一个函数，用于在组件卸载时执行传入的函数
  const onInvalidate = (fn) => {
    // 将传入的函数赋值给cleanup变量
    cleanup = fn
  }

  // 定义一个job函数，用于执行副作用函数
  const job = () => {
    newValue = effectFn()
    if (cleanup) {
      cleanup() // 执行回调前 清除过期回调
    }
    cb(newValue, oldValue, onInvalidate)
    oldValue = newValue
    if (options.once) { // 新增once选项 用于停止副作用函数
      effectFn.stop()
    }
  }

  const effectFn = effect(() => getter(), { // 创建副作用函数
    lazy: true,
    scheduler() {
      if (options.flush === 'post') {
        const p = Promise.resolve()
        p.then(job)
      } else {
        job()
      }
    }
  })

  if (options.immediate) { // 立即执行
    job()
  } else {
    oldValue = effectFn()
  }
  return effectFn
}

/**
 * 深度遍历函数：支持深度遍历
 * @param {*} value - 要遍历的值
 * @param {boolean|number} deep - 深度选项，数字表示最大深度
 * @param {Set} seen - 已访问的对象集合，防止循环引用
 * @param {number} currentDepth - 当前深度
 * @returns {*} 返回原值
 */
function traverse(value, deep = false, seen = new Set(), currentDepth = 0) {
  if (typeof value !== 'object' || value === null || seen.has(value)) {
    return value
  }
  seen.add(value)

  // 如果是响应式对象，总是需要访问一次以建立依赖关系
  if (typeof value === 'object') {
    // 检查深度限制
    const maxDepth = typeof deep === 'number' ? deep : (deep ? Infinity : 0)
    if (currentDepth < maxDepth) {
      for (const key in value) {
        traverse(value[key], deep, seen, currentDepth + 1)
      }
    }
  }

  return value
}
