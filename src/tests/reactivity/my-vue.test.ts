import { describe, it, expect } from 'vitest'
import { reactive, ref, computed, effect } from '@/my-vue/reactivity'

describe('我的Vue响应式系统实现 - 测试', () => {
  describe('reactive()', () => {
    it('应该创建响应式对象', () => {
      const original = { count: 0 }
      const observed = reactive(original)
      
      expect(observed).not.toBe(original)
      expect(observed.count).toBe(0)
    })

    it('应该响应属性变化', () => {
      const original = { count: 0 }
      const observed = reactive(original)
      let calls = 0
      
      effect(() => {
        calls++
        observed.count
      })
      
      expect(calls).toBe(1)
      observed.count++
      expect(calls).toBe(2)
    })

    it('应该支持嵌套对象', () => {
      const original = { nested: { count: 0 } }
      const observed = reactive(original)
      let calls = 0
      
      effect(() => {
        calls++
        observed.nested.count
      })
      
      expect(calls).toBe(1)
      observed.nested.count++
      expect(calls).toBe(2)
    })
  })

  describe('ref()', () => {
    it('应该创建响应式引用', () => {
      const count = ref(0)
      expect(count.value).toBe(0)
    })

    it('应该响应值变化', () => {
      const count = ref(0)
      let calls = 0
      
      effect(() => {
        calls++
        count.value
      })
      
      expect(calls).toBe(1)
      count.value++
      expect(calls).toBe(2)
    })
  })

  describe('computed()', () => {
    it('应该创建计算属性', () => {
      const count = ref(0)
      const double = computed(() => count.value * 2)
      
      expect(double.value).toBe(0)
      count.value = 5
      expect(double.value).toBe(10)
    })

    it('应该缓存计算结果', () => {
      const count = ref(0)
      let computeCalls = 0
      const double = computed(() => {
        computeCalls++
        return count.value * 2
      })
      
      expect(double.value).toBe(0)
      expect(double.value).toBe(0) // 第二次访问应该使用缓存
      expect(computeCalls).toBe(1)
      
      count.value = 5
      expect(double.value).toBe(10)
      expect(computeCalls).toBe(2)
    })
  })

  describe('effect()', () => {
    it('应该立即执行副作用函数', () => {
      let calls = 0
      effect(() => {
        calls++
      })
      
      expect(calls).toBe(1)
    })

    it('应该在依赖变化时重新执行', () => {
      const count = ref(0)
      let calls = 0
      
      effect(() => {
        calls++
        count.value
      })
      
      expect(calls).toBe(1)
      count.value++
      expect(calls).toBe(2)
    })
  })
}) 