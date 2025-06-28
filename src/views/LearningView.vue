<template>
  <div class="learning-container">
    <h1>Vue3 设计与实现学习</h1>
    
    <div class="learning-modules">
      <div class="module-card" @click="navigateToModule('reactivity')">
        <h3>响应式系统</h3>
        <p>学习Vue3的响应式原理，包括reactive、ref、computed、effect等核心API的实现</p>
        <div class="module-status">
          <span class="status-badge">进行中</span>
        </div>
      </div>
      
      <div class="module-card" @click="navigateToModule('components')">
        <h3>组件系统</h3>
        <p>理解Vue组件的创建、挂载、更新和卸载的完整生命周期</p>
        <div class="module-status">
          <span class="status-badge coming-soon">即将开始</span>
        </div>
      </div>
      
      <div class="module-card" @click="navigateToModule('vdom')">
        <h3>虚拟DOM</h3>
        <p>掌握虚拟DOM的创建、diff算法和patch更新的核心原理</p>
        <div class="module-status">
          <span class="status-badge coming-soon">即将开始</span>
        </div>
      </div>
      
      <div class="module-card" @click="navigateToModule('compiler')">
        <h3>模板编译</h3>
        <p>了解模板如何被编译成渲染函数，包括AST解析和代码生成</p>
        <div class="module-status">
          <span class="status-badge coming-soon">即将开始</span>
        </div>
      </div>
    </div>
    
    <div class="testing-section">
      <h2>测试工具</h2>
      <div class="test-buttons">
        <button @click="runOfficialTests" class="test-btn official">
          运行官方Vue3测试
        </button>
        <button @click="runMyVueTests" class="test-btn my-vue">
          运行我的Vue实现测试
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToModule = (module: string) => {
  router.push(`/learning/${module}`)
}

const runOfficialTests = () => {
  // 这里可以集成测试运行器
  console.log('运行官方Vue3测试...')
}

const runMyVueTests = () => {
  // 这里可以集成测试运行器
  console.log('运行我的Vue实现测试...')
}
</script>

<style scoped>
.learning-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 3rem;
  font-size: 2.5rem;
}

.learning-modules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.module-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.module-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #42b883;
}

.module-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.module-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.module-status {
  display: flex;
  justify-content: flex-end;
}

.status-badge {
  background: #42b883;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.coming-soon {
  background: #95a5a6;
}

.testing-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
}

.testing-section h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.test-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.test-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.test-btn.official {
  background: #42b883;
  color: white;
}

.test-btn.official:hover {
  background: #369870;
}

.test-btn.my-vue {
  background: #ff6b6b;
  color: white;
}

.test-btn.my-vue:hover {
  background: #e55a5a;
}
</style> 