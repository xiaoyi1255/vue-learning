<!--
 * @Author: taijingming 
 * @Date: 2025-06-28 14:28:05
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-28 15:07:44
 * @FilePath: \vue-test\vue-learning\src\components\HelloWorld.vue
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
-->
<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      欢迎来到Vue3学习项目
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
