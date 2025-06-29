<template>
  <div class="simple-screenshot">
    <h3>简化版截图组件</h3>

    <!-- 要截图的区域 -->
    <div ref="targetElement" class="target-area">
      <h4>目标区域</h4>
      <p>点击下方按钮截图这个区域</p>
      <div class="content-box">
        <span class="highlight">高亮文本</span>
        <div class="info-box">
          <strong>信息框</strong>
          <p>这里是一些示例内容</p>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="actions">
      <button @click="takeScreenshot" class="btn-primary">
        截图
      </button>
      <button @click="takeHighQualityScreenshot" class="btn-secondary">
        高质量截图
      </button>
      <button @click="screenshotAndDownload" class="btn-success">
        截图并下载
      </button>
    </div>

    <!-- 预览 -->
    <div v-if="previewUrl" class="preview">
      <h4>截图预览</h4>
      <img :src="previewUrl" alt="截图预览" class="preview-img" />
      <button @click="clearPreview" class="btn-clear">清除预览</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  captureElement,
  captureHighQuality,
  captureAndDownload
} from '@/utils/screenshot'

const targetElement = ref<HTMLElement>()
const previewUrl = ref<string>('')

// 普通截图
const takeScreenshot = async () => {
  if (!targetElement.value) return

  try {
    const dataUrl = await captureElement(targetElement.value)
    previewUrl.value = dataUrl
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败')
  }
}

// 高质量截图
const takeHighQualityScreenshot = async () => {
  if (!targetElement.value) return

  try {
    const dataUrl = await captureHighQuality(targetElement.value)
    previewUrl.value = dataUrl
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败')
  }
}

// 截图并下载
const screenshotAndDownload = async () => {
  if (!targetElement.value) return

  try {
    await captureAndDownload(
      targetElement.value,
      `screenshot-${Date.now()}.png`
    )
  } catch (error) {
    console.error('截图下载失败:', error)
    alert('截图下载失败')
  }
}

// 清除预览
const clearPreview = () => {
  previewUrl.value = ''
}
</script>

<style scoped>
.simple-screenshot {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.target-area {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  background: #f9f9f9;
}

.content-box {
  margin-top: 15px;
}

.highlight {
  background: yellow;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
}

.info-box {
  background: #e3f2fd;
  border: 1px solid #2196f3;
  border-radius: 6px;
  padding: 15px;
  margin-top: 15px;
}

.info-box strong {
  color: #1976d2;
}

.actions {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary,
.btn-success,
.btn-clear {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #218838;
}

.btn-clear {
  background: #dc3545;
  color: white;
}

.btn-clear:hover {
  background: #c82333;
}

.preview {
  margin-top: 30px;
  text-align: center;
}

.preview-img {
  max-width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
}

@media (max-width: 600px) {
  .actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary,
  .btn-success,
  .btn-clear {
    width: 100%;
  }
}
</style>
