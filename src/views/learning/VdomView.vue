<template>
  <div class="vdom-container">
    <div class="header">
      <h1>Vue3 虚拟DOM学习</h1>
      <p>深入理解Vue3虚拟DOM的设计原理和diff算法</p>
    </div>

    <div class="content">
      <div class="section">
        <h2>1. 虚拟DOM基础概念</h2>
        <div class="concept-card">
          <h3>什么是虚拟DOM？</h3>
          <p>虚拟DOM是对真实DOM的抽象表示，是一个JavaScript对象，描述了真实DOM的结构和属性。</p>
          
          <div class="code-example">
            <h4>虚拟DOM示例：</h4>
            <pre><code>// 虚拟DOM节点
const vnode = {
  type: 'div',
  props: { class: 'container' },
  children: [
    {
      type: 'h1',
      props: {},
      children: 'Hello Vue'
    }
  ]
}

// 对应的真实DOM
&lt;div class="container"&gt;
  &lt;h1&gt;Hello Vue&lt;/h1&gt;
&lt;/div&gt;</code></pre>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>2. 虚拟DOM的优势</h2>
        <div class="advantages-grid">
          <div class="advantage-card">
            <h3>🚀 性能优化</h3>
            <p>通过diff算法，只更新变化的部分，减少DOM操作次数</p>
          </div>
          <div class="advantage-card">
            <h3>🔄 跨平台</h3>
            <p>虚拟DOM可以渲染到不同平台（Web、移动端、桌面端）</p>
          </div>
          <div class="advantage-card">
            <h3>🧪 易于测试</h3>
            <p>虚拟DOM是纯JavaScript对象，便于单元测试</p>
          </div>
          <div class="advantage-card">
            <h3>🎯 声明式</h3>
            <p>开发者只需要描述期望的UI状态，框架负责DOM更新</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>3. Diff算法原理</h2>
        <div class="diff-cards">
          <div class="diff-card">
            <h3>同层比较</h3>
            <p>Vue3的diff算法采用同层比较策略，不会跨层级比较节点</p>
            <div class="code-block">
              <pre><code>function patch(n1, n2, container) {
  // 如果新旧节点类型不同，直接替换
  if (n1.type !== n2.type) {
    unmount(n1)
    mount(n2, container)
    return
  }
  
  // 同类型节点，更新属性
  patchProps(n1, n2)
  patchChildren(n1, n2, container)
}</code></pre>
            </div>
          </div>
          <div class="diff-card">
            <h3>快速Diff</h3>
            <p>Vue3使用快速Diff算法，通过key优化列表更新性能</p>
            <div class="code-block">
              <pre><code>function patchKeyedChildren(c1, c2, container) {
  // 1. 从头部开始比较
  // 2. 从尾部开始比较  
  // 3. 处理新增和删除的节点
  // 4. 移动和复用节点
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>4. 虚拟DOM实现</h2>
        <div class="implementation-cards">
          <div class="impl-card">
            <h3>创建虚拟DOM</h3>
            <p>h函数用于创建虚拟DOM节点</p>
            <div class="code-block">
              <pre><code>function h(type, props, children) {
  return {
    type,
    props: props || {},
    children: children || []
  }
}

// 使用示例
const vnode = h('div', { class: 'app' }, [
  h('h1', null, 'Hello'),
  h('p', null, 'World')
])</code></pre>
            </div>
          </div>
          <div class="impl-card">
            <h3>渲染虚拟DOM</h3>
            <p>render函数将虚拟DOM渲染为真实DOM</p>
            <div class="code-block">
              <pre><code>function render(vnode, container) {
  if (typeof vnode === 'string') {
    container.textContent = vnode
    return
  }
  
  const el = document.createElement(vnode.type)
  
  // 设置属性
  for (const key in vnode.props) {
    el.setAttribute(key, vnode.props[key])
  }
  
  // 渲染子节点
  vnode.children.forEach(child => {
    render(child, el)
  })
  
  container.appendChild(el)
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>5. 性能优化策略</h2>
        <div class="optimization-cards">
          <div class="opt-card">
            <h3>静态提升</h3>
            <p>将静态内容提升到渲染函数外部，避免重复创建</p>
          </div>
          <div class="opt-card">
            <h3>补丁标记</h3>
            <p>通过补丁标记（patchFlag）标识动态内容，优化更新</p>
          </div>
          <div class="opt-card">
            <h3>树结构优化</h3>
            <p>跳过静态节点，只对动态节点进行diff</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>6. 学习进度</h2>
        <div class="progress-info">
          <p>🚧 虚拟DOM学习模块正在开发中...</p>
          <p>预计包含：</p>
          <ul>
            <li>虚拟DOM的创建和渲染</li>
            <li>Diff算法的详细实现</li>
            <li>Patch更新的过程</li>
            <li>性能优化策略</li>
            <li>手写简化版虚拟DOM</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 虚拟DOM学习页面逻辑
</script>

<style scoped>
.vdom-container {
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

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.advantage-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.advantage-card h3 {
  color: #42b883;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.advantage-card p {
  color: #666;
  line-height: 1.6;
}

.diff-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.diff-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.diff-card h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.diff-card p {
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

.implementation-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.impl-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.impl-card h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.impl-card p {
  color: #666;
  margin-bottom: 1.5rem;
}

.optimization-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.opt-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.opt-card h3 {
  color: #42b883;
  margin-bottom: 1rem;
}

.opt-card p {
  color: #666;
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
  .diff-cards,
  .implementation-cards {
    grid-template-columns: 1fr;
  }
}
</style> 