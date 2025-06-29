import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { spawn } from 'child_process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 自定义插件：监听 effect.ts 文件变化
    {
      name: 'watch-effect-test',
      configureServer(server) {
        // 监听 effect.ts 文件变化
        server.watcher.add('src/learning/reactivity/effect.ts')

        server.watcher.on('change', (file) => {
          if (file.includes('src/learning/reactivity/effect.ts')) {
            console.log('🔍 effect.ts 文件变化，执行测试...')

            // 执行测试
            const testProcess = spawn('npm', ['test', 'src/tests/reactivity/effect.test.ts'], {
              stdio: 'inherit',
              shell: true
            })

            testProcess.on('close', (code) => {
              console.log(`✅ 测试完成，退出码: ${code}`)
            })
          }
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom',
    globals: true
  }
})
