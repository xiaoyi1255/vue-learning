/*
 * @Author: taijingming
 * @Date: 2025-06-28 16:08:49
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-28 16:27:08
 * @FilePath: \vue-learning\src\learning\reactivity\fn.js
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
// 保存依赖的容器 weakMap => key: target, value: Map => key: key, value: Set => 依赖的函数
export const bucket = new WeakMap()

// 当前激活的副作用函数
export let activeEffect = null

// 收集依赖
export const track = (target, key) => {
  if (!activeEffect) return
  bucket.set(target, (bucket.get(target) || new Map()).set(key, activeEffect))
}

// 触发依赖
export const trigger = (target, key) => {
  const depsMap = bucket.get(target)
  const deps = depsMap.get(key)
  deps.forEach(dep => dep())
}