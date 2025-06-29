<template>
  <div class="style-showcase">
    <section class="test-section style-section">
      <h2>复杂样式测试</h2>
      <p class="style-note">
        💡 注意：某些CSS效果（如动画、滤镜、复杂变换）在截图时可能无法完全保留，这是html2canvas的限制。
      </p>
      <div class="style-demo">
        <div class="gradient-box">
          <h3>渐变背景</h3>
          <p>这是一个带有渐变背景的盒子</p>
        </div>
        <div class="shadow-box">
          <h3>阴影效果</h3>
          <p>这是一个带有阴影效果的盒子</p>
        </div>
        <div class="border-box">
          <h3>渐变边框</h3>
          <p>这是一个带有渐变边框的盒子</p>
        </div>
        <div class="transform-box">
          <h3>变换效果</h3>
          <p>这是一个带有变换效果的盒子</p>
        </div>
        <div class="filter-box">
          <h3>滤镜效果</h3>
          <p>这是一个带有滤镜效果的盒子</p>
        </div>
        <div class="animation-box">
          <h3>动画效果</h3>
          <p>这是一个带有动画效果的盒子</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 无需特殊逻辑
</script>

<style scoped>
.style-showcase {
  background: #fdf3ef;
  min-height: 100vh;
  padding: 32px 0;
}

.test-section {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  border: 2px solid #ececec;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  padding: 32px 24px 32px 24px;
}

.test-section h2 {
  margin: 0 0 18px 0;
  color: #222;
  font-size: 1.5rem;
  font-weight: 600;
}

.style-note {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 24px;
  color: #856404;
  font-size: 0.98rem;
  line-height: 1.5;
}

.style-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.gradient-box {
  background: linear-gradient(90deg, #e96443 0%, #904e95 100%);
  color: #fff;
  padding: 32px 0 24px 0;
  border-radius: 8px;
  text-align: center;
  font-size: 1.18rem;
  box-shadow: 0 2px 8px rgba(233, 100, 67, 0.08);
}

.gradient-box h3 {
  margin: 0 0 8px 0;
  font-size: 1.18rem;
  font-weight: 500;
  letter-spacing: 1px;
}

.gradient-box p {
  margin: 0;
  opacity: 0.96;
}

.shadow-box {
  background: #fff;
  padding: 32px 0 24px 0;
  border-radius: 8px;
  text-align: center;
  font-size: 1.18rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  border: 1px solid #e0e0e0;
}

.shadow-box h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.18rem;
  font-weight: 500;
}

.shadow-box p {
  margin: 0;
  color: #666;
}

.border-box {
  background: #eafcff;
  padding: 32px 0 24px 0;
  border-radius: 8px;
  text-align: center;
  font-size: 1.18rem;
  border: 3px solid transparent;
  background: linear-gradient(#eafcff, #eafcff) padding-box,
    linear-gradient(90deg, #43cea2 0%, #185a9d 100%) border-box;
  box-shadow: 0 2px 8px rgba(67, 206, 162, 0.08);
}

.border-box h3 {
  margin: 0 0 8px 0;
  color: #185a9d;
  font-size: 1.18rem;
  font-weight: 500;
}

.border-box p {
  margin: 0;
  color: #185a9d;
}

.transform-box {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 32px 0 24px 0;
  border-radius: 8px;
  text-align: center;
  font-size: 1.18rem;
  transform: rotate(-1.5deg) scale(0.99);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.13);
}

.transform-box h3 {
  margin: 0 0 8px 0;
  font-size: 1.18rem;
  font-weight: 500;
}

.transform-box p {
  margin: 0;
  opacity: 0.96;
}

.filter-box {
  background: #fff;
  padding: 32px 0 24px 0;
  border-radius: 8px;
  text-align: center;
  font-size: 1.18rem;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.13)) brightness(1.08) contrast(1.08);
  border: 1px solid #e0e0e0;
}

.filter-box h3 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 1.18rem;
  font-weight: 500;
}

.filter-box p {
  margin: 0;
  color: #666;
}

.animation-box {
  background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
  color: #fff;
  padding: 32px 0 24px 0;
  border-radius: 8px;
  text-align: center;
  font-size: 1.18rem;
  box-shadow: 0 6px 20px rgba(240, 147, 251, 0.13);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.02);
  }

  100% {
    transform: scale(1);
  }
}

.animation-box h3 {
  margin: 0 0 8px 0;
  font-size: 1.18rem;
  font-weight: 500;
}

.animation-box p {
  margin: 0;
  opacity: 0.96;
}

@media (max-width: 700px) {
  .test-section {
    max-width: 98vw;
    padding: 18px 4vw 18px 4vw;
  }

  .style-demo {
    gap: 16px;
  }
}
</style>
