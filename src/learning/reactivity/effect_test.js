/*
 * @Author: taijingming
 * @Date: 2025-06-30 10:47:40
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-30 14:24:58
 * @FilePath: \vue-learning\src\learning\reactivity\effect_test.js
 * @Description: 实现 effect 函数 + 简易版 reactive
 * 响应式系统：响应式对象的属性 与 副作用函数的关联
 * 副作用函数：
 *  1. 副作用函数会根据响应式对象的属性值的变化而重新执行
 *  2. 表现形式： vue2 Watcher, vue3 effect => render 函数 \ 计算属性 \ watch \ watchEffect
 *
 * 响应式数据：
 *  1. 响应式对象
 *  2. 在副作用函数中被访问
 *
 * 1. effect 函数
 * 2. 依赖收集
 * 3. 触发依赖
 * 4. 调度器
 * 5. 停止监听
 * 6. 计算属性
 * 7. watch
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */

let activeEffect = null; // 全局变量 => 当前活跃的副作用函数
const effectStack = []; // 副作用函数栈
const bucket = new WeakMap(); // 存储副作用函数与响应式对象的映射关系
/**
 * bucket 结构：
 *  WeakMap {
 *   响应式对象[target]: Map {
 *     属性[key]: Set[副作用函数]
 *   }
 * }
 */

function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.options = options;
  effectFn.deps = [];
  effectFn();
  return effectFn;
}

function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const deps = depsMap.get(key);
  if (!deps) return;
  const effectFn = new Set(deps);
  effectFn.forEach((fn) => {
    if (fn.options.scheduler) {
      fn.options.scheduler(fn);
    } else {
      fn();
    }
  });
}

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      trigger(target, key);
      return res;
    },
  });
}

export { effect, track, trigger, reactive };