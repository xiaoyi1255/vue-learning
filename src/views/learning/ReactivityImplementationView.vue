<template>
  <div class="implementation-container">
    <div class="header">
      <button @click="goBack" class="back-btn">← 返回</button>
      <h1>{{ apiTitle }} 实现</h1>
      <p>{{ apiDescription }}</p>
    </div>

    <div class="content">
      <!-- 实现步骤 -->
      <div class="section">
        <h2>实现步骤</h2>
        <div class="steps">
          <div v-for="(step, index) in implementationSteps" :key="index" class="step-card"
            :class="{ active: currentStep === index }">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <div class="code-example" v-if="step.code">
                <h4>代码示例：</h4>
                <pre><code>{{ step.code }}</code></pre>
              </div>
              <div class="thinking" v-if="step.thinking">
                <h4>思考过程：</h4>
                <p>{{ step.thinking }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 完整实现 -->
      <div class="section">
        <h2>完整实现</h2>
        <div class="implementation-card">
          <div class="code-tabs">
            <button v-for="tab in codeTabs" :key="tab.name" @click="activeTab = tab.name"
              :class="{ active: activeTab === tab.name }" class="tab-btn">
              {{ tab.label }}
            </button>
          </div>
          <div class="code-content">
            <pre><code>{{ getActiveCode() }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 测试验证 -->
      <div class="section">
        <h2>测试验证</h2>
        <div class="test-card">
          <button @click="runTest" class="test-btn" :disabled="isRunning">
            {{ isRunning ? '运行中...' : '运行测试' }}
          </button>
          <div v-if="testResult" class="test-result" :class="testResult.status">
            <h4>测试结果：</h4>
            <p>{{ testResult.message }}</p>
            <div v-if="testResult.error" class="error">{{ testResult.error }}</div>
          </div>
        </div>
      </div>

      <!-- 下一步 -->
      <div class="section">
        <h2>下一步学习</h2>
        <div class="next-steps">
          <div v-for="next in nextSteps" :key="next.api" class="next-step-card" @click="goToNextStep(next.api)">
            <h3>{{ next.title }}</h3>
            <p>{{ next.description }}</p>
            <span class="arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const api = computed(() => route.params.api as string)
const currentStep = ref(0)
const activeTab = ref('basic')
const isRunning = ref(false)
const testResult = ref<{
  status: 'success' | 'error' | 'pending'
  message: string
  error?: string
} | null>(null)

// API信息映射
const apiInfo = {
  reactive: {
    title: 'reactive() 函数',
    description: '创建响应式对象，使用Proxy拦截对象的get和set操作',
    steps: [
      {
        title: '理解Proxy的作用',
        description: 'Proxy可以拦截对象的基本操作，如属性读取、设置等',
        code: `const proxy = new Proxy(target, {
  get(target, key, receiver) {
    // 拦截属性读取
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    // 拦截属性设置
    return Reflect.set(target, key, value, receiver)
  }
})`,
        thinking: 'Proxy是ES6的新特性，可以创建一个代理对象来拦截对原对象的操作。这比Vue2的Object.defineProperty更强大，可以拦截更多操作。'
      },
      {
        title: '添加依赖收集',
        description: '在get拦截器中收集当前正在执行的副作用函数',
        code: `get(target, key, receiver) {
  const result = Reflect.get(target, key, receiver)
  track(target, key) // 收集依赖
  return result
}`,
        thinking: '当访问响应式对象的属性时，我们需要知道是哪个副作用函数在访问，这样当属性变化时就能通知到对应的函数。'
      },
      {
        title: '添加派发更新',
        description: '在set拦截器中触发所有相关的副作用函数',
        code: `set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver)
  trigger(target, key) // 派发更新
  return result
}`,
        thinking: '当设置响应式对象的属性时，我们需要通知所有依赖这个属性的副作用函数重新执行。'
      }
    ]
  },
  ref: {
    title: 'ref() 函数',
    description: '创建响应式引用，包装基本类型值',
    steps: [
      {
        title: '理解ref的作用',
        description: 'ref用于包装基本类型值，使其具有响应式特性',
        code: `const count = ref(0)
console.log(count.value) // 访问值
count.value = 1 // 设置值`,
        thinking: '基本类型值（如number、string）不能直接使用Proxy，所以需要用ref来包装，通过.value属性来访问和设置值。'
      },
      {
        title: '实现getter和setter',
        description: '使用Object.defineProperty或getter/setter语法',
        code: `const refObject = {
  get value() {
    track(refObject, 'value')
    return value
  },
  set value(newValue) {
    value = newValue
    trigger(refObject, 'value')
  }
}`,
        thinking: '通过getter和setter，我们可以在访问和设置值时进行依赖收集和派发更新。'
      }
    ]
  },
  computed: {
    title: 'computed() 函数',
    description: '创建计算属性，具有缓存特性',
    steps: [
      {
        title: '理解计算属性的特点',
        description: '计算属性基于响应式数据，具有缓存特性，只有依赖变化时才重新计算',
        code: `const count = ref(0)
const double = computed(() => count.value * 2)`,
        thinking: '计算属性本质上是一个响应式的值，它的值依赖于其他响应式数据，并且具有缓存特性。'
      },
      {
        title: '实现缓存机制',
        description: '使用dirty标志来控制是否需要重新计算',
        code: `let dirty = true
let value

const runner = () => {
  value = getter()
  dirty = false
}`,
        thinking: '通过dirty标志，我们可以避免不必要的重复计算，提高性能。'
      },
      {
        title: '响应依赖变化',
        description: '当依赖变化时，设置dirty为true，下次访问时重新计算',
        code: `effect(runner, {
  lazy: true,
  scheduler() {
    dirty = true // 依赖变化时标记为需要重新计算
  }
})`,
        thinking: '使用effect来监听依赖变化，当依赖变化时通过scheduler来标记需要重新计算。'
      }
    ]
  }
}

const apiTitle = computed(() => apiInfo[api.value]?.title || '未知API')
const apiDescription = computed(() => apiInfo[api.value]?.description || '')
const implementationSteps = computed(() => apiInfo[api.value]?.steps || [])

// 代码标签页
const codeTabs = [
  { name: 'basic', label: '基础实现' },
  { name: 'complete', label: '完整实现' },
  { name: 'test', label: '测试代码' }
]

// 获取当前激活的代码
const getActiveCode = () => {
  const codes = {
    reactive: {
      basic: `function reactive<T extends object>(target: T): T {
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
}`,
      complete: `function reactive<T extends object>(target: T): T {
  // 检查是否已经是响应式对象
  if (isReactive(target)) {
    return target
  }

  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)
      track(target, key)

      // 如果值是对象，递归创建响应式
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }

      return result
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return result
    },
    deleteProperty(target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (result && hadKey) {
        trigger(target, key)
      }
      return result
    }
  })
}`,
      test: `describe('reactive()', () => {
  it('应该创建响应式对象', () => {
    const original = { count: 0 }
    const observed = reactive(original)

    expect(observed).not.toBe(original)
    expect(observed.count).toBe(0)
  })

  it('应该响应属性变化', () => {
    const original = { count: 0 }
    const observed = reactive(original)
    let calls = 0

    effect(() => {
      calls++
      observed.count
    })

    expect(calls).toBe(1)
    observed.count++
    expect(calls).toBe(2)
  })
})`
    },
    ref: {
      basic: `function ref<T>(value: T) {
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
}`,
      complete: `function ref<T>(value: T) {
  if (isRef(value)) {
    return value
  }

  const refObject = {
    __v_isRef: true,
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue: T) {
      if (hasChanged(value, newValue)) {
        value = newValue
        trigger(refObject, 'value')
      }
    }
  }
  return refObject
}`,
      test: `describe('ref()', () => {
  it('应该创建响应式引用', () => {
    const count = ref(0)
    expect(count.value).toBe(0)
  })

  it('应该响应值变化', () => {
    const count = ref(0)
    let calls = 0

    effect(() => {
      calls++
      count.value
    })

    expect(calls).toBe(1)
    count.value++
    expect(calls).toBe(2)
  })
})`
    },
    computed: {
      basic: `function computed<T>(getter: () => T) {
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
}`,
      complete: `function computed<T>(getter: () => T) {
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
      if (!dirty) {
        dirty = true
        trigger(computedRef, 'value')
      }
    }
  })

  const computedRef = {
    __v_isRef: true,
    get value() {
      if (dirty) {
        effectInstance.run()
      }
      track(computedRef, 'value')
      return value
    }
  }

  return computedRef
}`,
      test: `describe('computed()', () => {
  it('应该创建计算属性', () => {
    const count = ref(0)
    const double = computed(() => count.value * 2)

    expect(double.value).toBe(0)
    count.value = 5
    expect(double.value).toBe(10)
  })

  it('应该缓存计算结果', () => {
    const count = ref(0)
    let computeCalls = 0
    const double = computed(() => {
      computeCalls++
      return count.value * 2
    })

    expect(double.value).toBe(0)
    expect(double.value).toBe(0) // 第二次访问应该使用缓存
    expect(computeCalls).toBe(1)
  })
})`
    }
  }

  return codes[api.value]?.[activeTab.value] || '代码未找到'
}

// 下一步学习
const nextSteps = computed(() => {
  const steps = {
    reactive: [
      { api: 'ref', title: 'ref() 函数', description: '学习如何创建响应式引用' },
      { api: 'computed', title: 'computed() 函数', description: '学习如何创建计算属性' }
    ],
    ref: [
      { api: 'computed', title: 'computed() 函数', description: '学习如何创建计算属性' },
      { api: 'reactive', title: 'reactive() 函数', description: '学习如何创建响应式对象' }
    ],
    computed: [
      { api: 'reactive', title: 'reactive() 函数', description: '学习如何创建响应式对象' },
      { api: 'ref', title: 'ref() 函数', description: '学习如何创建响应式引用' }
    ]
  }
  return steps[api.value] || []
})

const goBack = () => {
  router.push('/learning/reactivity')
}

const goToNextStep = (nextApi: string) => {
  router.push(`/learning/reactivity/implementation/${nextApi}`)
}

const runTest = async () => {
  isRunning.value = true
  testResult.value = null

  try {
    // 模拟测试运行
    await new Promise(resolve => setTimeout(resolve, 1000))

    testResult.value = {
      status: 'success',
      message: `${apiTitle.value} 测试通过！所有功能正常工作。`
    }
  } catch (error) {
    testResult.value = {
      status: 'error',
      message: '测试失败',
      error: error instanceof Error ? error.message : String(error)
    }
  } finally {
    isRunning.value = false
  }
}

onMounted(() => {
  // 重置状态
  currentStep.value = 0
  activeTab.value = 'basic'
  testResult.value = null
})
</script>

<style scoped>
.implementation-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  margin-bottom: 3rem;
  position: relative;
}

.back-btn {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background 0.3s ease;
}

.back-btn:hover {
  background: #5f4dd0;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.header p {
  color: #666;
  font-size: 1.2rem;
}

.section {
  margin-bottom: 3rem;
}

.section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.step-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.step-card.active {
  border-left: 4px solid #42b883;
  background: #f8fffe;
}

.step-number {
  background: #42b883;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.step-content p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.code-example,
.thinking {
  margin-top: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.code-example h4,
.thinking h4 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.code-example pre {
  background: #2c3e50;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.9rem;
}

.implementation-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.code-tabs {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.tab-btn {
  background: none;
  border: none;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.tab-btn.active {
  background: white;
  color: #42b883;
  border-bottom: 2px solid #42b883;
}

.code-content {
  padding: 2rem;
}

.code-content pre {
  background: #2c3e50;
  color: #fff;
  padding: 1.5rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.9rem;
  line-height: 1.5;
}

.test-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.test-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.test-btn:hover:not(:disabled) {
  background: #369870;
}

.test-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.test-result {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 6px;
}

.test-result.success {
  background: #d4edda;
  color: #155724;
}

.test-result.error {
  background: #f8d7da;
  color: #721c24;
}

.test-result h4 {
  margin-bottom: 0.5rem;
}

.error {
  background: #f8d7da;
  color: #721c24;
  padding: 0.5rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  font-size: 0.875rem;
}

.next-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.next-step-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.next-step-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.next-step-card h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.next-step-card p {
  color: #666;
  margin-bottom: 1rem;
}

.arrow {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5rem;
  color: #42b883;
}

@media (max-width: 768px) {
  .step-card {
    flex-direction: column;
  }

  .next-steps {
    grid-template-columns: 1fr;
  }
}
</style>
