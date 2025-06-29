<template>
  <div class="screenshot-demo">
    <h2>页面截图功能演示</h2>

    <!-- 要截图的区域 -->
    <div ref="captureArea" class="capture-area">
      <h3>这是要截图的区域</h3>
      <p>这里可以包含任何内容，包括文字、图片、样式等。</p>
      <div class="demo-content">
        <div class="card">
          <h4>示例卡片</h4>
          <p>这是一个包含样式的卡片组件</p>
          <button class="btn">按钮示例</button>
        </div>
        <div class="card">
          <h4>另一个卡片</h4>
          <p>支持复杂的CSS样式和布局</p>
          <div class="badge">标签</div>
        </div>
      </div>
    </div>

    <!-- 控制按钮 -->
    <div class="controls">
      <button @click="capturePage" class="capture-btn">
        截图整个页面
      </button>
      <button @click="captureArea" class="capture-btn">
        截图指定区域
      </button>
      <button @click="captureWithOptions" class="capture-btn">
        高质量截图
      </button>
    </div>

    <!-- 预览区域 -->
    <div v-if="capturedImage" class="preview">
      <h3>截图预览</h3>
      <img :src="capturedImage" alt="截图预览" class="preview-image" />
      <div class="preview-actions">
        <button @click="downloadImage" class="download-btn">
          下载图片
        </button>
        <button @click="clearPreview" class="clear-btn">
          清除预览
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import html2canvas from 'html2canvas'

// 响应式数据
const captureArea = ref<HTMLElement>()
const capturedImage = ref<string>('')

// 截图整个页面
const capturePage = async () => {
  try {
    const canvas = await html2canvas(document.body)
    capturedImage.value = canvas.toDataURL('image/png')
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败，请重试')
  }
}

// 截图指定区域
const captureArea = async () => {
  if (!captureArea.value) return

  try {
    const canvas = await html2canvas(captureArea.value)
    capturedImage.value = canvas.toDataURL('image/png')
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败，请重试')
  }
}

// 高质量截图（更多配置选项）
const captureWithOptions = async () => {
  if (!captureArea.value) return

  try {
    const canvas = await html2canvas(captureArea.value, {
      allowTaint: true, // 允许跨域图片
      useCORS: true, // 使用CORS
      scale: 2, // 提高分辨率
      backgroundColor: '#ffffff', // 背景色
      width: captureArea.value.offsetWidth,
      height: captureArea.value.offsetHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight
    })
    capturedImage.value = canvas.toDataURL('image/png', 1.0)
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败，请重试')
  }
}

// 下载图片
const downloadImage = () => {
  if (!capturedImage.value) return

  const link = document.createElement('a')
  link.download = `screenshot-${Date.now()}.png`
  link.href = capturedImage.value
  link.click()
}

// 清除预览
const clearPreview = () => {
  capturedImage.value = ''
}
</script>

<style scoped>
.screenshot-demo {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.capture-area {
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.demo-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.card h4 {
  color: #333;
  margin: 0 0 10px 0;
}

.card p {
  color: #666;
  margin: 0 0 15px 0;
}

.btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn:hover {
  background: #0056b3;
}

.badge {
  display: inline-block;
  background: #28a745;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.controls {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.capture-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.capture-btn:hover {
  background: #218838;
}

.preview {
  margin-top: 30px;
  text-align: center;
}

.preview-image {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.preview-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.download-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.download-btn:hover {
  background: #0056b3;
}

.clear-btn {
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.clear-btn:hover {
  background: #c82333;
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
  }

  .capture-btn {
    width: 100%;
  }
}
</style>
