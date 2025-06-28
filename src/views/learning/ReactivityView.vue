<template>
  <div class="reactivity-container">
    <div class="header">
      <h1>Vue3 响应式系统学习</h1>
      <p>深入理解Vue3响应式系统的核心原理和实现</p>
    </div>

    <div class="content">
      <div class="section">
        <h2>1. 响应式基础概念</h2>
        <div class="concept-card">
          <h3>什么是响应式？</h3>
          <p>响应式是指当数据发生变化时，相关的视图会自动更新。Vue3使用Proxy来实现响应式系统。</p>
          
          <div class="code-example">
            <h4>基本示例：</h4>
            <pre><code>// 原始对象
const original = { count: 0 }

// 创建响应式对象
const reactive = reactive(original)

// 当数据变化时，视图自动更新
reactive.count++ // 触发更新</code></pre>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>2. 核心API对比</h2>
        <div class="api-comparison">
          <div class="api-card">
            <h3>官方Vue3 API</h3>
            <div class="api-item">
              <h4>reactive()</h4>
              <p>创建响应式对象</p>
              <button @click="testOfficialReactive" class="test-btn">测试</button>
            </div>
            <div class="api-item">
              <h4>ref()</h4>
              <p>创建响应式引用</p>
              <button @click="testOfficialRef" class="test-btn">测试</button>
            </div>
            <div class="api-item">
              <h4>computed()</h4>
              <p>创建计算属性</p>
              <button @click="testOfficialComputed" class="test-btn">测试</button>
            </div>
          </div>

          <div class="api-card">
            <h3>我的实现</h3>
            <div class="api-item">
              <h4>reactive()</h4>
              <p>创建响应式对象</p>
              <button @click="testMyReactive" class="test-btn my">测试</button>
            </div>
            <div class="api-item">
              <h4>ref()</h4>
              <p>创建响应式引用</p>
              <button @click="testMyRef" class="test-btn my">测试</button>
            </div>
            <div class="api-item">
              <h4>computed()</h4>
              <p>创建计算属性</p>
              <button @click="testMyComputed" class="test-btn my">测试</button>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>3. 实现原理</h2>
        <div class="principle-cards">
          <div class="principle-card">
            <h3>依赖收集 (track)</h3>
            <p>当访问响应式数据时，收集当前正在执行的副作用函数</p>
            <div class="code-block">
              <pre><code>function track(target, key) {
  if (!activeEffect) return
  
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  
  dep.add(activeEffect)
}</code></pre>
            </div>
          </div>

          <div class="principle-card">
            <h3>派发更新 (trigger)</h3>
            <p>当数据变化时，通知所有相关的副作用函数重新执行</p>
            <div class="code-block">
              <pre><code>function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
  const dep = depsMap.get(key)
  if (!dep) return
  
  dep.forEach(effect => {
    effect()
  })
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>4. 测试结果</h2>
        <div class="test-results">
          <div class="result-item" v-for="result in testResults" :key="result.id">
            <div class="result-header">
              <span class="test-name">{{ result.name }}</span>
              <span :class="['status', result.status]">{{ result.status }}</span>
            </div>
            <div class="result-details">
              <p>{{ result.description }}</p>
              <div v-if="result.error" class="error">{{ result.error }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reactive as officialReactive, ref as officialRef, computed as officialComputed } from 'vue'
import { reactive as myReactive, ref as myRef, computed as myComputed } from '@/my-vue/reactivity'

const testResults = ref<Array<{
  id: number
  name: string
  status: 'success' | 'error' | 'pending'
  description: string
  error?: string
}>>([])

let resultId = 0

const addResult = (name: string, status: 'success' | 'error' | 'pending', description: string, error?: string) => {
  testResults.value.push({
    id: ++resultId,
    name,
    status,
    description,
    error
  })
}

const testOfficialReactive = () => {
  try {
    const original = { count: 0 }
    const observed = officialReactive(original)
    let calls = 0
    
    // 模拟effect
    const effect = () => {
      calls++
      observed.count
    }
    effect()
    
    observed.count++
    
    addResult(
      '官方 reactive()',
      'success',
      `响应式对象创建成功，effect调用次数: ${calls}`
    )
  } catch (error) {
    addResult(
      '官方 reactive()',
      'error',
      '测试失败',
      error instanceof Error ? error.message : String(error)
    )
  }
}

const testOfficialRef = () => {
  try {
    const count = officialRef(0)
    let calls = 0
    
    const effect = () => {
      calls++
      count.value
    }
    effect()
    
    count.value++
    
    addResult(
      '官方 ref()',
      'success',
      `响应式引用创建成功，effect调用次数: ${calls}`
    )
  } catch (error) {
    addResult(
      '官方 ref()',
      'error',
      '测试失败',
      error instanceof Error ? error.message : String(error)
    )
  }
}

const testOfficialComputed = () => {
  try {
    const count = officialRef(0)
    const double = officialComputed(() => count.value * 2)
    
    addResult(
      '官方 computed()',
      'success',
      `计算属性创建成功，初始值: ${double.value}`
    )
  } catch (error) {
    addResult(
      '官方 computed()',
      'error',
      '测试失败',
      error instanceof Error ? error.message : String(error)
    )
  }
}

const testMyReactive = () => {
  try {
    const original = { count: 0 }
    const observed = myReactive(original)
    let calls = 0
    
    // 模拟effect
    const effect = () => {
      calls++
      observed.count
    }
    effect()
    
    observed.count++
    
    addResult(
      '我的 reactive()',
      'success',
      `响应式对象创建成功，effect调用次数: ${calls}`
    )
  } catch (error) {
    addResult(
      '我的 reactive()',
      'error',
      '测试失败',
      error instanceof Error ? error.message : String(error)
    )
  }
}

const testMyRef = () => {
  try {
    const count = myRef(0)
    let calls = 0
    
    const effect = () => {
      calls++
      count.value
    }
    effect()
    
    count.value++
    
    addResult(
      '我的 ref()',
      'success',
      `响应式引用创建成功，effect调用次数: ${calls}`
    )
  } catch (error) {
    addResult(
      '我的 ref()',
      'error',
      '测试失败',
      error instanceof Error ? error.message : String(error)
    )
  }
}

const testMyComputed = () => {
  try {
    const count = myRef(0)
    const double = myComputed(() => count.value * 2)
    
    addResult(
      '我的 computed()',
      'success',
      `计算属性创建成功，初始值: ${double.value}`
    )
  } catch (error) {
    addResult(
      '我的 computed()',
      'error',
      '测试失败',
      error instanceof Error ? error.message : String(error)
    )
  }
}
</script>

<style scoped>
.reactivity-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
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

.concept-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.concept-card h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.code-example {
  margin-top: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
}

.code-example h4 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

.code-example pre {
  background: #2c3e50;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}

.api-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.api-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.api-card h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.api-item {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.api-item h4 {
  color: #42b883;
  margin-bottom: 0.5rem;
}

.api-item p {
  color: #666;
  margin-bottom: 1rem;
}

.test-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.test-btn:hover {
  background: #369870;
}

.test-btn.my {
  background: #ff6b6b;
}

.test-btn.my:hover {
  background: #e55a5a;
}

.principle-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.principle-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.principle-card h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.principle-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.code-block {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.code-block pre {
  background: #2c3e50;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.9rem;
}

.test-results {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.result-item {
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 0;
}

.result-item:last-child {
  border-bottom: none;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.test-name {
  font-weight: 500;
  color: #2c3e50;
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status.success {
  background: #d4edda;
  color: #155724;
}

.status.error {
  background: #f8d7da;
  color: #721c24;
}

.status.pending {
  background: #fff3cd;
  color: #856404;
}

.result-details p {
  color: #666;
  margin-bottom: 0.5rem;
}

.error {
  background: #f8d7da;
  color: #721c24;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .api-comparison,
  .principle-cards {
    grid-template-columns: 1fr;
  }
}
</style> 