/*
 * @Author: taijingming
 * @Date: 2025-06-29 09:47:27
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-29 15:08:41
 * @FilePath: \vue-learning\src\views\watch.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { effect } from './effect'

// 定义类型
type WatchSource<T = unknown> = T | (() => T)
type WatchCallback<T = unknown> = (newValue: T, oldValue: T, onInvalidate: (fn: () => void) => void) => void
type WatchOptions = {
  immediate?: boolean
  deep?: boolean | number
  flush?: 'pre' | 'post' | 'sync'
  once?: boolean
}

export function watch<T = unknown>(
  source: WatchSource<T>,
  cb: WatchCallback<T>,
  options: WatchOptions = {}
) {
  let getter: () => T
  if (typeof source === 'function') {
    // 当 source 是函数时，需要包装一下以支持 deep 选项
    if (options.deep) {
      getter = () => traverse((source as () => T)(), options.deep)
    } else {
      getter = source as () => T
    }
  } else {
    // 修复：traverse 应该返回一个 getter 函数
    getter = () => traverse(source as T, options.deep)
  }

  let oldValue: T
  let newValue: T
  let cleanup: (() => void) | undefined //存放过期回调

  // 定义一个函数，用于在组件卸载时执行传入的函数
  const onInvalidate = (fn: () => void) => {
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

// 修复 traverse 函数：支持深度遍历
function traverse<T>(value: T, deep: boolean | number = false, seen = new Set(), currentDepth = 0): T {
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
        traverse((value as Record<string, unknown>)[key], deep, seen, currentDepth + 1)
      }
    }
  }

  return value
}
