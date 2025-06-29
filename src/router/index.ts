/*
 * @Author: taijingming
 * @Date: 2025-06-28 14:28:05
 * @LastEditors: taijingming
 * @LastEditTime: 2025-06-28 15:00:34
 * @FilePath: \vue-test\vue-learning\src\router\index.ts
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LearningView from '../views/LearningView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/learning',
      name: 'learning',
      component: LearningView,
    },
    {
      path: '/learning/reactivity',
      name: 'reactivity',
      component: () => import('../views/learning/ReactivityView.vue'),
    },
    {
      path: '/learning/reactivity/implementation/:api',
      name: 'reactivity-implementation',
      component: () => import('../views/learning/ReactivityImplementationView.vue'),
    },
    {
      path: '/learning/components',
      name: 'components',
      component: () => import('../views/learning/ComponentsView.vue'),
    },
    {
      path: '/learning/vdom',
      name: 'vdom',
      component: () => import('../views/learning/VdomView.vue'),
    },
    {
      path: '/learning/compiler',
      name: 'compiler',
      component: () => import('../views/learning/CompilerView.vue'),
    },
  ],
})

export default router
