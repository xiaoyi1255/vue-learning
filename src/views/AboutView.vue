<!--
 * @Author: taijingming
 * @Date: 2025-06-28 14:28:05
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-29 15:08:19
 * @FilePath: \vue-learning\src\views\AboutView.vue
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
-->
<template>
  <div class="about">
    <h1>关于这个项目</h1>
    <p>这是一个专门用于学习Vue3核心原理和实现的项目。</p>
    <p>通过手写实现Vue3的核心功能，深入理解框架的设计思想。</p>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from './effect';
import { watch } from './watch.js';
// import { watch, reactive, effect } from 'vue';
const obj = reactive({
  name: '小易',
  age: 18,
  address: {
    sheng: {
      name: '广东',
      city: {
        name: '深圳',
      }
    }

  }
})

console.log('开始设置 watch')
watch(() => obj, (newVal, oldVal) => {
  console.log('watch 回调执行了！', { newVal, oldVal })
}, {
  deep: true // 支持深度监听，也可以传入数字表示监听层数，如 deep: 2
})

// 测试数字深度功能
watch(() => obj, (newVal, oldVal) => {
  console.log('watch 深度4 回调执行了！', { newVal, oldVal })
}, {
  deep: 4 // 只监听4层深度
})

console.log('修改 obj.name')
obj.name = '小易2'

console.log('修改 obj.address.sheng.city.name')
obj.address.sheng.city.name = 'sss'

</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
