<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.svg" />
    <HelloWorld msg="欢迎来到Vue3学习项目！" />

    <div class="quick-links">
      <h3>快速导航</h3>
      <div class="links-grid">
        <router-link to="/learning" class="link-card">
          <h4>📚 学习模块</h4>
          <p>Vue3 响应式、组件、虚拟DOM等</p>
        </router-link>
        <router-link to="/screenshot-test" class="link-card">
          <h4>📸 截图测试</h4>
          <p>测试页面转图片功能</p>
        </router-link>
        <router-link to="/about" class="link-card">
          <h4>ℹ️ 关于</h4>
          <p>项目信息和说明</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

img {
  width: 125px;
  height: 125px;
  margin-bottom: 2rem;
}

.quick-links {
  margin-top: 3rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.quick-links h3 {
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.link-card {
  display: block;
  padding: 1.5rem;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.link-card:hover {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 123, 255, 0.2);
}

.link-card h4 {
  margin: 0 0 0.5rem 0;
  color: #007bff;
  font-size: 1.2rem;
}

.link-card p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .links-grid {
    grid-template-columns: 1fr;
  }

  .link-card {
    padding: 1rem;
  }
}
</style>
