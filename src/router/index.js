/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// const routerHistory = createWebHistory()
const routerHashHistory = createWebHashHistory()

// 1、定义（路由组件）
// import HelloWorld from '@/components/HelloWorld'

// 2.定义（路由组件）
// 每条路由都映射到一个组件。
const routes = [
  { path: '/', name: 'RegisterList', component: () => import('@/pages/Register/RegisterList') },
  { path: '/InfoEdit', name: 'InfoEdit', component: () => import('@/pages/Register/InfoEdit') }
]

// 3、创建router实例，然后传'routes'配置
const router = createRouter({
  mode: 'history',
  // history: routerHistory,
  history: routerHashHistory,
  routes
})
export default router
