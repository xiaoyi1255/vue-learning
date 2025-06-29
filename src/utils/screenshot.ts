import html2canvas from 'html2canvas'

export interface ScreenshotOptions {
  scale?: number
  backgroundColor?: string
  allowTaint?: boolean
  useCORS?: boolean
  width?: number
  height?: number
  scrollX?: number
  scrollY?: number
  windowWidth?: number
  windowHeight?: number
  quality?: number
  format?: 'png' | 'jpeg' | 'webp'
}

/**
 * 截图指定元素
 * @param element 要截图的DOM元素
 * @param options 截图选项
 * @returns Promise<string> 返回base64格式的图片数据
 */
export async function captureElement(
  element: HTMLElement,
  options: ScreenshotOptions = {}
): Promise<string> {
  const defaultOptions: ScreenshotOptions = {
    scale: 1,
    backgroundColor: '#ffffff',
    allowTaint: true,
    useCORS: true,
    quality: 1.0,
    format: 'png'
  }

  const mergedOptions = { ...defaultOptions, ...options }

  try {
    const canvas = await html2canvas(element, {
      allowTaint: mergedOptions.allowTaint,
      useCORS: mergedOptions.useCORS,
      scale: mergedOptions.scale,
      backgroundColor: mergedOptions.backgroundColor,
      width: mergedOptions.width,
      height: mergedOptions.height,
      scrollX: mergedOptions.scrollX,
      scrollY: mergedOptions.scrollY,
      windowWidth: mergedOptions.windowWidth,
      windowHeight: mergedOptions.windowHeight
    })

    const mimeType = `image/${mergedOptions.format}`
    return canvas.toDataURL(mimeType, mergedOptions.quality)
  } catch (error) {
    console.error('截图失败:', error)
    throw new Error('截图失败')
  }
}

/**
 * 截图整个页面
 * @param options 截图选项
 * @returns Promise<string> 返回base64格式的图片数据
 */
export async function capturePage(options: ScreenshotOptions = {}): Promise<string> {
  return captureElement(document.body, options)
}

/**
 * 截图指定区域（通过选择器）
 * @param selector CSS选择器
 * @param options 截图选项
 * @returns Promise<string> 返回base64格式的图片数据
 */
export async function captureBySelector(
  selector: string,
  options: ScreenshotOptions = {}
): Promise<string> {
  const element = document.querySelector(selector) as HTMLElement
  if (!element) {
    throw new Error(`未找到元素: ${selector}`)
  }
  return captureElement(element, options)
}

/**
 * 下载图片
 * @param dataUrl base64格式的图片数据
 * @param filename 文件名（可选）
 */
export function downloadImage(dataUrl: string, filename?: string): void {
  const link = document.createElement('a')
  link.download = filename || `screenshot-${Date.now()}.png`
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 截图并下载
 * @param element 要截图的DOM元素
 * @param filename 文件名（可选）
 * @param options 截图选项
 */
export async function captureAndDownload(
  element: HTMLElement,
  filename?: string,
  options: ScreenshotOptions = {}
): Promise<void> {
  const dataUrl = await captureElement(element, options)
  downloadImage(dataUrl, filename)
}

/**
 * 高质量截图（2倍分辨率）
 * @param element 要截图的DOM元素
 * @returns Promise<string> 返回base64格式的图片数据
 */
export async function captureHighQuality(element: HTMLElement): Promise<string> {
  return captureElement(element, {
    scale: 2,
    quality: 1.0,
    backgroundColor: '#ffffff'
  })
}

/**
 * 截图到Blob对象
 * @param element 要截图的DOM元素
 * @param options 截图选项
 * @returns Promise<Blob> 返回Blob对象
 */
export async function captureToBlob(
  element: HTMLElement,
  options: ScreenshotOptions = {}
): Promise<Blob> {
  const defaultOptions: ScreenshotOptions = {
    scale: 1,
    backgroundColor: '#ffffff',
    allowTaint: true,
    useCORS: true,
    quality: 1.0,
    format: 'png'
  }

  const mergedOptions = { ...defaultOptions, ...options }

  try {
    const canvas = await html2canvas(element, {
      allowTaint: mergedOptions.allowTaint,
      useCORS: mergedOptions.useCORS,
      scale: mergedOptions.scale,
      backgroundColor: mergedOptions.backgroundColor,
      width: mergedOptions.width,
      height: mergedOptions.height,
      scrollX: mergedOptions.scrollX,
      scrollY: mergedOptions.scrollY,
      windowWidth: mergedOptions.windowWidth,
      windowHeight: mergedOptions.windowHeight
    })

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob!)
      }, `image/${mergedOptions.format}`, mergedOptions.quality)
    })
  } catch (error) {
    console.error('截图失败:', error)
    throw new Error('截图失败')
  }
}
