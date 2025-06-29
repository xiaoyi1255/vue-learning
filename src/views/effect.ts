/*
 * @Author: taijingming
 * @Date: 2025-06-28 16:51:00
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-29 14:13:22
 * @FilePath: \vue-learning\src\views\effect.ts
 * @Description: 实现effect函数
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

let activeEffect = null
const effectStack = []
const targetMap = new WeakMap()

export function effect(fn, options = {}) {
  const { lazy, scheduler } = options
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    // 入栈
    effectStack.push(effectFn)
    const res = fn()
    // 出栈
    effectStack.pop()
    // activeEffect 指向 恢复
    activeEffect = effectStack[effectStack.length - 1]
    return res
  }
  if (!lazy) {
    effectFn()
  }
  effectFn.options = options
  effectFn.deps = []
  effectFn.stop = () => { // 新增stop方法 用于停止副作用函数
    cleanup(effectFn)
    effectFn.active = false
  }
  return effectFn
}


export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      const res = Reflect.get(target, key)
      // 如果获取的值是对象，递归创建响应式
      if (typeof res === 'object' && res !== null) {
        return reactive(res)
      }
      return res
    },
    set(target, key, value) {
      const res = Reflect.set(target, key, value)
      trigger(target, key)
      return res
    }
  })
}

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

export function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const deps = depsMap.get(key)
  if (!deps) return
  // console.log('[trigger] deps', target, key, deps)
  const set = new Set()
  // 避免无限循环
  deps.forEach((effect) => {
    if (effect !== activeEffect) {
      set.add(effect)
    }
  })
  set.forEach((effect) => {
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect()
    }
  })
}

export const cleanup = (effectFn) => {
  if (effectFn.deps && effectFn.deps.length) {
    for (let i = 0; i < effectFn.deps.length; i++) {
      const deps = effectFn.deps[i]
      deps.delete(effectFn)
    }
    effectFn.deps.length = 0
  }
}



// 任务调度
export const jobQueue = new Set()
export const p = Promise.resolve()

export let isFlushing = false
export function flushJob() {
  if (!isFlushing) {
    isFlushing = true
    p.then(() => {
      jobQueue.forEach(job => job())
    }).finally(() => {
      isFlushing = false
    })
  }
}
