// Vue3 响应式系统学习 - Effect 实现
// 这里将逐步实现 effect 函数的核心功能

// 副作用函数类型定义
interface ReactiveEffect<T = any> {
  (): T
  readonly _isEffect: true
  active: boolean
  raw: () => T
  deps: Array<Dep>
  options: ReactiveEffectOptions
}

interface ReactiveEffectOptions {
  lazy?: boolean
  scheduler?: (job: ReactiveEffect) => void
}

// 依赖类型定义
type Dep = Set<ReactiveEffect>

// 🎯 全局变量 - 这是响应式系统的核心
let activeEffect: ReactiveEffect | undefined
const effectStack: ReactiveEffect[] = []

// 依赖收集器
type DepsMap = Map<string | symbol, Dep>
type TargetMap = WeakMap<object, DepsMap>

const targetMap: TargetMap = new WeakMap()

// ReactiveEffect 类实现
class ReactiveEffect<T = any> {
  public readonly _isEffect: true = true
  active = true
  deps: Array<Dep> = []
  options: ReactiveEffectOptions

  constructor(
    public fn: () => T,
    options: ReactiveEffectOptions = {}
  ) {
    this.options = options
  }

  run(): T {
    if (!this.active) {
      return this.fn()
    }

    try {
      // 🔑 关键：将当前 effect 压入栈
      effectStack.push(this)
      // 🔑 关键：设置全局 activeEffect
      activeEffect = this
      // 执行副作用函数
      return this.fn()
    } finally {
      // 🔑 关键：执行完毕后，从栈中弹出
      effectStack.pop()
      // 🔑 关键：恢复上一个 effect 为活跃状态
      activeEffect = effectStack[effectStack.length - 1]
    }
  }

  stop() {
    if (this.active) {
      cleanupEffect(this)
      this.active = false
    }
  }
}

// 清理副作用函数的依赖
function cleanupEffect(effect: ReactiveEffect) {
  const { deps } = effect
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect)
    }
    deps.length = 0
  }
}

// 🎯 依赖收集 - 使用全局 activeEffect
function track(target: object, key: string | symbol) {
  // 🔑 关键：检查是否有活跃的 effect
  if (!activeEffect) return

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  // 🔑 关键：将当前活跃的 effect 添加到依赖中
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

// 🎯 派发更新 - 通知所有相关的副作用函数
function trigger(target: object, key: string | symbol) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  const dep = depsMap.get(key)
  if (!dep) return

  const effects = new Set<ReactiveEffect>()

  dep.forEach((effect) => {
    // 🔑 关键：避免无限循环，不触发当前正在执行的 effect
    if (effect !== activeEffect) {
      effects.add(effect)
    }
  })

  effects.forEach((effect) => {
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      effect.run()
    }
  })
}

// 🎯 创建副作用函数
function effect<T = any>(fn: () => T, options: ReactiveEffectOptions = {}): ReactiveEffect<T> {
  const _effect = new ReactiveEffect(fn, options)

  if (!options.lazy) {
    _effect.run()
  }

  return _effect
}

// 导出API
export { reactive, ref, computed, effect, track, trigger }
export type { ReactiveEffect, ReactiveEffectOptions, Dep }

// 🎯 临时实现其他函数（为了测试）
function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      track(target, key)
      return result
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return result
    }
  })
}

function ref<T>(value: T) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue: T) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}

function computed<T>(getter: () => T) {
  let dirty = true
  let value: T

  const runner = () => {
    value = getter()
    dirty = false
  }

  const effectInstance = effect(runner, {
    lazy: true,
    scheduler() {
      dirty = true
    }
  })

  return {
    get value() {
      if (dirty) {
        effectInstance.run()
      }
      return value
    }
  }
}