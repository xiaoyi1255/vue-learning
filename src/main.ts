/*
 * @Author: taijingming 
 * @Date: 2025-06-28 14:28:05
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-28 14:42:30
 * @FilePath: \vue-test\vue-learning\src\main.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
