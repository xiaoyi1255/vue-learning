# 页面截图功能使用说明

## 安装依赖

```bash
pnpm add html2canvas
```

## 功能特性

- ✅ 截图指定DOM元素
- ✅ 截图整个页面
- ✅ 高质量截图（2倍分辨率）
- ✅ 支持多种图片格式（PNG、JPEG、WebP）
- ✅ 自动下载功能
- ✅ TypeScript支持
- ✅ 响应式设计

## 使用方法

### 1. 基础使用

```vue
<template>
  <div ref="targetElement">
    <!-- 要截图的内容 -->
  </div>
  <button @click="takeScreenshot">截图</button>
</template>

<script setup>
import { ref } from 'vue'
import { captureElement } from '@/utils/screenshot'

const targetElement = ref()

const takeScreenshot = async () => {
  const dataUrl = await captureElement(targetElement.value)
  console.log('截图完成:', dataUrl)
}
</script>
```

### 2. 高质量截图

```vue
<script setup>
import { captureHighQuality } from '@/utils/screenshot'

const takeHighQualityScreenshot = async () => {
  const dataUrl = await captureHighQuality(targetElement.value)
  // 2倍分辨率，更清晰的图片
}
</script>
```

### 3. 截图并下载

```vue
<script setup>
import { captureAndDownload } from '@/utils/screenshot'

const screenshotAndDownload = async () => {
  await captureAndDownload(
    targetElement.value, 
    'my-screenshot.png'
  )
}
</script>
```

### 4. 自定义选项

```vue
<script setup>
import { captureElement } from '@/utils/screenshot'

const takeCustomScreenshot = async () => {
  const dataUrl = await captureElement(targetElement.value, {
    scale: 2, // 2倍分辨率
    backgroundColor: '#ffffff', // 背景色
    format: 'jpeg', // 图片格式
    quality: 0.8 // 图片质量
  })
}
</script>
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `scale` | number | 1 | 缩放比例，用于提高分辨率 |
| `backgroundColor` | string | '#ffffff' | 背景颜色 |
| `allowTaint` | boolean | true | 允许跨域图片 |
| `useCORS` | boolean | true | 使用CORS |
| `format` | string | 'png' | 图片格式：png/jpeg/webp |
| `quality` | number | 1.0 | 图片质量（0-1） |

## 注意事项

1. **跨域图片**: 如果页面包含跨域图片，需要设置 `allowTaint: true` 和 `useCORS: true`
2. **字体渲染**: 某些自定义字体可能无法正确渲染
3. **CSS动画**: 截图时会捕获当前状态，不会包含动画效果
4. **性能**: 高质量截图会增加处理时间，建议在用户交互时使用

## 常见问题

### Q: 截图失败怎么办？
A: 检查控制台错误信息，常见原因：
- 元素未正确渲染
- 跨域资源问题
- 内存不足

### Q: 如何提高截图质量？
A: 使用 `scale: 2` 或更高的值，但会增加文件大小和处理时间

### Q: 支持哪些浏览器？
A: 支持所有现代浏览器，包括移动端浏览器

## 示例组件

项目包含两个示例组件：
- `ScreenshotDemo.vue` - 完整功能演示
- `SimpleScreenshot.vue` - 简化版示例

可以直接在项目中使用这些组件进行测试。 