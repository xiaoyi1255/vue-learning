<template>
  <div class="components-container">
    <div class="header">
      <h1>Vue3 组件系统学习</h1>
      <p>深入理解Vue3组件系统的设计和实现原理</p>
    </div>

    <div class="content">
      <div class="section">
        <h2>1. 组件基础概念</h2>
        <div class="concept-card">
          <h3>什么是组件？</h3>
          <p>组件是Vue应用的基本构建块，是可复用的Vue实例，拥有自己的模板、逻辑和样式。</p>
          
          <div class="code-example">
            <h4>基本组件示例：</h4>
            <pre><code>// 组件定义
const MyComponent = {
  template: '&lt;div&gt;Hello {{ name }}&lt;/div&gt;',
  data() {
    return { name: 'Vue' }
  }
}

// 组件使用
&lt;MyComponent /&gt;</code></pre>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>2. 组件生命周期</h2>
        <div class="lifecycle-cards">
          <div class="lifecycle-card">
            <h3>创建阶段</h3>
            <ul>
              <li>beforeCreate - 实例初始化之后</li>
              <li>created - 实例创建完成</li>
            </ul>
          </div>
          <div class="lifecycle-card">
            <h3>挂载阶段</h3>
            <ul>
              <li>beforeMount - 挂载开始之前</li>
              <li>mounted - 挂载完成</li>
            </ul>
          </div>
          <div class="lifecycle-card">
            <h3>更新阶段</h3>
            <ul>
              <li>beforeUpdate - 数据更新时</li>
              <li>updated - 更新完成</li>
            </ul>
          </div>
          <div class="lifecycle-card">
            <h3>销毁阶段</h3>
            <ul>
              <li>beforeUnmount - 卸载之前</li>
              <li>unmounted - 卸载完成</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>3. 组件通信</h2>
        <div class="communication-cards">
          <div class="comm-card">
            <h3>Props 向下传递</h3>
            <p>父组件向子组件传递数据</p>
            <div class="code-block">
              <pre><code>// 父组件
&lt;ChildComponent :message="parentMessage" /&gt;

// 子组件
props: ['message']</code></pre>
            </div>
          </div>
          <div class="comm-card">
            <h3>Emit 向上传递</h3>
            <p>子组件向父组件发送事件</p>
            <div class="code-block">
              <pre><code>// 子组件
this.$emit('update', newValue)

// 父组件
&lt;ChildComponent @update="handleUpdate" /&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>4. 组件实现原理</h2>
        <div class="principle-cards">
          <div class="principle-card">
            <h3>组件创建</h3>
            <p>组件实例的创建过程，包括数据初始化、方法绑定等</p>
            <div class="code-block">
              <pre><code>function createComponentInstance(vnode) {
  const instance = {
    type: vnode.type,
    vnode,
    props: {},
    attrs: {},
    slots: {},
    ctx: {},
    data: {},
    setupState: {},
    isMounted: false
  }
  return instance
}</code></pre>
            </div>
          </div>
          <div class="principle-card">
            <h3>组件挂载</h3>
            <p>组件挂载到DOM的过程，包括模板编译、渲染等</p>
            <div class="code-block">
              <pre><code>function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode)
  setupComponent(instance)
  setupRenderEffect(instance, container)
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>5. 学习进度</h2>
        <div class="progress-info">
          <p>🚧 组件系统学习模块正在开发中...</p>
          <p>预计包含：</p>
          <ul>
            <li>组件实例的创建和挂载</li>
            <li>组件的更新机制</li>
            <li>组件的卸载和清理</li>
            <li>组件间的通信机制</li>
            <li>手写简化版组件系统</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 组件系统学习页面逻辑
</script>

<style scoped>
.components-container {
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

.lifecycle-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.lifecycle-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.lifecycle-card h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.lifecycle-card ul {
  list-style: none;
  padding: 0;
}

.lifecycle-card li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  color: #666;
}

.lifecycle-card li:last-child {
  border-bottom: none;
}

.communication-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.comm-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.comm-card h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.comm-card p {
  color: #666;
  margin-bottom: 1.5rem;
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

.progress-info {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 12px;
  padding: 2rem;
  color: #856404;
}

.progress-info p {
  margin-bottom: 1rem;
}

.progress-info ul {
  margin-left: 1.5rem;
}

.progress-info li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .communication-cards,
  .principle-cards {
    grid-template-columns: 1fr;
  }
}
</style> 