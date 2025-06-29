<template>
  <div class="screenshot-test">
    <header class="page-header">
      <h1>📸 页面截图功能测试</h1>
      <p>测试各种截图场景和功能</p>
    </header>

    <!-- 测试区域1: 基础内容 -->
    <section ref="basicSection" class="test-section basic-section">
      <h2>基础内容测试</h2>
      <div class="content-grid">
        <div class="content-card">
          <h3>文本内容</h3>
          <p>这是一段普通的文本内容，用于测试文字渲染效果。</p>
          <p>支持 <strong>粗体</strong>、<em>斜体</em>、<span class="highlight">高亮</span> 等样式。</p>
        </div>
        <div class="content-card">
          <h3>列表内容</h3>
          <ul>
            <li>列表项 1</li>
            <li>列表项 2</li>
            <li>列表项 3</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 测试区域2: 复杂样式 -->
    <section ref="styleSection" class="test-section style-section">
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

    <!-- 测试区域3: 响应式布局 -->
    <section ref="layoutSection" class="test-section layout-section">
      <h2>响应式布局测试</h2>
      <div class="responsive-grid">
        <div class="grid-item">项目 1</div>
        <div class="grid-item">项目 2</div>
        <div class="grid-item">项目 3</div>
        <div class="grid-item">项目 4</div>
        <div class="grid-item">项目 5</div>
        <div class="grid-item">项目 6</div>
      </div>
    </section>

    <!-- 测试区域4: 表单元素 -->
    <section ref="formSection" class="test-section form-section">
      <h2>表单元素测试</h2>
      <form class="test-form">
        <div class="form-group">
          <label>用户名:</label>
          <input type="text" placeholder="请输入用户名" />
        </div>
        <div class="form-group">
          <label>邮箱:</label>
          <input type="email" placeholder="请输入邮箱" />
        </div>
        <div class="form-group">
          <label>选择:</label>
          <select>
            <option>选项 1</option>
            <option>选项 2</option>
            <option>选项 3</option>
          </select>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" /> 同意条款
          </label>
        </div>
        <button type="button" class="form-btn">提交</button>
      </form>
    </section>

    <!-- 控制面板 -->
    <section class="control-panel">
      <h2>截图控制</h2>
      <div class="controls">
        <div class="control-group">
          <h3>区域截图</h3>
          <button @click="captureBasic" class="control-btn">截图基础内容</button>
          <button @click="captureStyle" class="control-btn">截图样式区域</button>
          <button @click="captureLayout" class="control-btn">截图布局区域</button>
          <button @click="captureForm" class="control-btn">截图表单区域</button>
        </div>

        <div class="control-group">
          <h3>全局截图</h3>
          <button @click="capturePage" class="control-btn">截图整个页面</button>
          <button @click="captureHighQuality" class="control-btn">高质量截图</button>
        </div>

        <div class="control-group">
          <h3>批量操作</h3>
          <button @click="captureAllSections" class="control-btn">截图所有区域</button>
          <button @click="downloadAll" class="control-btn">下载所有截图</button>
        </div>
      </div>
    </section>

    <!-- 预览区域 -->
    <section v-if="previewImages.length > 0" class="preview-section">
      <div class="preview-header">
        <h2>📸 截图预览</h2>
        <div class="preview-controls">
          <button @click="clearAllPreviews" class="clear-all-btn">清除所有</button>
          <button @click="togglePreview" class="close-btn" title="关闭预览">✕</button>
        </div>
      </div>
      <div class="preview-container">
        <div v-for="(image, index) in previewImages" :key="index" class="preview-item">
          <div class="preview-item-header">
            <h4>{{ image.name }}</h4>
            <div class="preview-actions">
              <button @click="downloadSingle(image)" class="action-btn" title="下载">
                📥
              </button>
              <button @click="removePreview(index)" class="action-btn remove" title="删除">
                🗑️
              </button>
            </div>
          </div>
          <img :src="image.dataUrl" :alt="image.name" class="preview-image" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  captureElement,
  capturePage as capturePageUtil,
  captureHighQuality as captureHighQualityUtil,
  downloadImage
} from '@/utils/screenshot'

// 响应式数据
const basicSection = ref<HTMLElement>()
const styleSection = ref<HTMLElement>()
const layoutSection = ref<HTMLElement>()
const formSection = ref<HTMLElement>()

interface PreviewImage {
  name: string
  dataUrl: string
  filename: string
}

const previewImages = ref<PreviewImage[]>([])

// 截图基础内容区域
const captureBasic = async () => {
  if (!basicSection.value) return
  try {
    const dataUrl = await captureElement(basicSection.value)
    addPreview('基础内容区域', dataUrl, 'basic-content.png')
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败')
  }
}

// 截图样式区域
const captureStyle = async () => {
  if (!styleSection.value) return
  try {
    const dataUrl = await captureElement(styleSection.value)
    addPreview('样式区域', dataUrl, 'style-section.png')
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败')
  }
}

// 截图布局区域
const captureLayout = async () => {
  if (!layoutSection.value) return
  try {
    const dataUrl = await captureElement(layoutSection.value)
    addPreview('布局区域', dataUrl, 'layout-section.png')
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败')
  }
}

// 截图表单区域
const captureForm = async () => {
  if (!formSection.value) return
  try {
    const dataUrl = await captureElement(formSection.value)
    addPreview('表单区域', dataUrl, 'form-section.png')
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败')
  }
}

// 截图整个页面
const capturePage = async () => {
  try {
    const dataUrl = await capturePageUtil()
    addPreview('整个页面', dataUrl, 'full-page.png')
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败')
  }
}

// 高质量截图
const captureHighQuality = async () => {
  if (!basicSection.value) return
  try {
    const dataUrl = await captureHighQualityUtil(basicSection.value)
    addPreview('高质量截图', dataUrl, 'high-quality.png')
  } catch (error) {
    console.error('截图失败:', error)
    alert('截图失败')
  }
}

// 截图所有区域
const captureAllSections = async () => {
  const sections = [
    { ref: basicSection, name: '基础内容', filename: 'basic.png' },
    { ref: styleSection, name: '样式区域', filename: 'style.png' },
    { ref: layoutSection, name: '布局区域', filename: 'layout.png' },
    { ref: formSection, name: '表单区域', filename: 'form.png' }
  ]

  for (const section of sections) {
    if (section.ref.value) {
      try {
        const dataUrl = await captureElement(section.ref.value)
        addPreview(section.name, dataUrl, section.filename)
      } catch (error) {
        console.error(`${section.name}截图失败:`, error)
      }
    }
  }
}

// 下载所有截图
const downloadAll = () => {
  previewImages.value.forEach((image, index) => {
    setTimeout(() => {
      downloadImage(image.dataUrl, image.filename)
    }, index * 100) // 延迟下载，避免浏览器阻止
  })
}

// 添加预览
const addPreview = (name: string, dataUrl: string, filename: string) => {
  previewImages.value.push({
    name,
    dataUrl,
    filename
  })
}

// 下载单个截图
const downloadSingle = (image: PreviewImage) => {
  downloadImage(image.dataUrl, image.filename)
}

// 删除预览
const removePreview = (index: number) => {
  previewImages.value.splice(index, 1)
}

// 清除所有预览
const clearAllPreviews = () => {
  previewImages.value = []
}

// 切换预览状态
const togglePreview = () => {
  previewImages.value = []
}
</script>

<style scoped>
.screenshot-test {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.page-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

.page-header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.test-section {
  margin-bottom: 40px;
  padding: 30px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
}

.test-section h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 1.5rem;
}

/* 基础内容区域 */
.basic-section {
  background: #f8f9fa;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.content-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.highlight {
  background: yellow;
  padding: 2px 4px;
  border-radius: 3px;
}

/* 样式区域 */
.style-section {
  background: #fff5f5;
}

.style-note {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 20px;
  color: #856404;
  font-size: 0.9rem;
  line-height: 1.4;
}

.style-demo {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.gradient-box {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.gradient-box h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.gradient-box p {
  margin: 0;
  opacity: 0.9;
}

.shadow-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  border: 1px solid #e0e0e0;
}

.shadow-box h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
}

.shadow-box p {
  margin: 0;
  color: #666;
}

.border-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  position: relative;
  border: 3px solid transparent;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(45deg, #ff6b6b, #4ecdc4) border-box;
  box-shadow: 0 4px 15px rgba(78, 205, 196, 0.2);
}

.border-box h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
}

.border-box p {
  margin: 0;
  color: #666;
}

.transform-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  transform: rotate(2deg) scale(0.98);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.transform-box h3 {
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.transform-box p {
  margin: 0;
  opacity: 0.9;
}

.filter-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2)) brightness(1.1) contrast(1.1);
  border: 1px solid #e0e0e0;
}

.filter-box h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2rem;
}

.filter-box p {
  margin: 0;
  color: #666;
}

.animation-box {
  background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(240, 147, 251, 0.3);
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
  margin: 0 0 10px 0;
  font-size: 1.2rem;
}

.animation-box p {
  margin: 0;
  opacity: 0.9;
}

/* 布局区域 */
.layout-section {
  background: #f0f8ff;
}

.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.grid-item {
  background: #007bff;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

/* 表单区域 */
.form-section {
  background: #f0fff0;
}

.test-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.form-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.form-btn:hover {
  background: #218838;
}

/* 控制面板 */
.control-panel {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 12px;
  margin-bottom: 40px;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.control-group h3 {
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.2rem;
}

.control-btn {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background: #007bff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.control-btn:hover {
  background: #0056b3;
}

/* 预览区域 */
.preview-section {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 350px;
  max-height: calc(100vh - 40px);
  background: white;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow-y: auto;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.preview-header h2 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.preview-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.clear-all-btn {
  background: #6c757d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
}

.clear-all-btn:hover {
  background: #545b62;
}

.close-btn {
  background: #dc3545;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: #c82333;
}

.preview-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.preview-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  background: #f8f9fa;
}

.preview-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.preview-item h4 {
  margin: 0;
  color: #333;
  font-size: 0.9rem;
  font-weight: 600;
}

.preview-image {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 8px;
}

.preview-actions {
  display: flex;
  gap: 5px;
}

.action-btn {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  background: #007bff;
  color: white;
  transition: background-color 0.2s;
}

.action-btn:hover {
  background: #0056b3;
}

.action-btn.remove {
  background: #dc3545;
}

.action-btn.remove:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .screenshot-test {
    padding: 10px;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .controls {
    grid-template-columns: 1fr;
  }

  .preview-container {
    flex-direction: column;
  }

  /* 移动端预览区域样式 */
  .preview-section {
    position: fixed;
    top: 10px;
    right: 10px;
    left: 10px;
    width: auto;
    max-height: calc(100vh - 20px);
    z-index: 1000;
  }

  .preview-header {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }

  .preview-controls {
    justify-content: space-between;
  }

  .preview-item {
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .preview-section {
    top: 5px;
    right: 5px;
    left: 5px;
    padding: 15px;
  }

  .preview-header h2 {
    font-size: 1rem;
  }

  .preview-controls {
    flex-direction: column;
    gap: 5px;
  }

  .clear-all-btn,
  .close-btn {
    width: 100%;
    height: auto;
    padding: 8px;
  }
}
</style>
