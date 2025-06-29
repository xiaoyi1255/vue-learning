# Effect 函数实现指南

## 学习目标

理解并实现 Vue3 响应式系统中的核心 `effect` 函数。

## 实现步骤

### 第一步：最基础的 effect 函数

首先实现一个最简单的 effect 函数，它能够：

1. 接收一个函数作为参数
2. 立即执行这个函数
3. 返回一个可调用的函数

```typescript
export function effect<T = any>(fn: () => T): () => T {
  // 你的实现
}
```

### 第二步：添加 ReactiveEffect 类

创建一个 `ReactiveEffect` 类来管理副作用函数：

```typescript
class ReactiveEffect<T = any> {
  public readonly _isEffect: true = true
  active = true
  deps: Array<Dep> = []
  options: ReactiveEffectOptions

  constructor(
    public fn: () => T,
    options: ReactiveEffectOptions = {},
  ) {
    this.options = options
  }

  run(): T {
    // 实现运行逻辑
  }
}
```

### 第三步：实现依赖收集机制

使用全局变量来跟踪当前正在执行的副作用函数：

```typescript
let activeEffect: ReactiveEffect | undefined
const effectStack: ReactiveEffect[] = []

// 在 ReactiveEffect.run() 中：
try {
  effectStack.push(this)
  activeEffect = this
  return this.fn()
} finally {
  effectStack.pop()
  activeEffect = effectStack[effectStack.length - 1]
}
```

### 第四步：支持 lazy 选项

当 `options.lazy` 为 true 时，不立即执行函数：

```typescript
export function effect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions = {},
): ReactiveEffect<T> {
  const _effect = new ReactiveEffect(fn, options)

  if (!options.lazy) {
    _effect.run()
  }

  return _effect
}
```

## 测试你的实现

运行测试来验证你的实现：

```bash
npm test src/tests/reactivity/effect.test.ts
```

## 文件结构

```
src/
├── learning/reactivity/
│   ├── effect.ts          # 你的 effect 函数实现
│   └── EFFECT_GUIDE.md    # 学习指南
└── tests/reactivity/
    ├── basic.test.ts      # 官方 Vue3 测试
    ├── my-vue.test.ts     # 完整实现测试
    └── effect.test.ts     # Effect 函数学习测试
```

## 下一步

完成 effect 函数后，你将学习：

1. `track` 函数 - 依赖收集
2. `trigger` 函数 - 派发更新
3. `reactive` 函数 - 响应式对象
4. `ref` 函数 - 响应式引用

## 提示

- 先实现最简单的功能，确保测试通过
- 逐步添加更复杂的功能
- 参考 `src/my-vue/reactivity/index.ts` 中的实现作为对比
