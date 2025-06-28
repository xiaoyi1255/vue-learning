// 我的Vue响应式系统实现
// 这里将实现 reactive, ref, computed, effect 等核心API

// 全局的副作用函数栈
let activeEffect: ReactiveEffect | undefined
const effectStack: ReactiveEffect[] = []

// 副作用函数类型
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

// 依赖收集器
type Dep = Set<ReactiveEffect>
type DepsMap = Map<string | symbol, Dep>
type TargetMap = WeakMap<object, DepsMap>

const targetMap: TargetMap = new WeakMap()

// ReactiveEffect 类实现
class ReactiveEffect<T = any> {
  public readonly _isEffect: true = true;
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
      effectStack.push(this)
      activeEffect = this
      return this.fn()
    } finally {
      effectStack.pop()
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

// 依赖收集
function track(target: object, key: string | symbol) {
  if (!activeEffect) return
  
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
    activeEffect.deps.push(dep)
  }
}

// 派发更新
function trigger(target: object, key: string | symbol) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  if (!dep) return
  
  const effects = new Set<ReactiveEffect>()
  
  dep.forEach((effect) => {
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

// 创建副作用函数
function effect<T = any>(fn: () => T, options: ReactiveEffectOptions = {}): ReactiveEffect<T> {
  const _effect = new ReactiveEffect(fn, options)
  
  if (!options.lazy) {
    _effect.run()
  }
  
  return _effect
}

// 响应式对象实现
function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      track(target, key)
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      return result
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return result
    }
  })
}

// 响应式引用实现
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

// 计算属性实现
function computed<T>(getter: () => T) {
  let dirty = true
  let value: T
  let effectInstance: ReactiveEffect

  const runner = () => {
    value = getter()
    dirty = false
  }

  effectInstance = effect(runner, {
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

// 导出API
export { reactive, ref, computed, effect } 