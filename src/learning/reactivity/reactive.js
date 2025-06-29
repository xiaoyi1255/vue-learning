/*
 * @Author: taijingming
 * @Date: 2025-06-28 16:06:48
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-28 16:29:16
 * @FilePath: \vue-learning\src\learning\reactivity\reactive.js
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { track, trigger } from './fn.js'
import { activeEffect } from './fn.js'

const obj = {
  name: 'John',
  age: 20
}

export const proxyObj = new Proxy(obj, {
  get(target, key) {
    if (activeEffect) {
      track(target, key)
    }
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    if (activeEffect) {
      trigger(target, key)
    }
    return true
  }
})

