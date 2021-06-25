/* eslint-disable no-irregular-whitespace */
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'

import router from './router/index.js'
import store from './store/index.js'
import App from './App.vue'

import { post, get } from './api/http'

const app = createApp(App)
app.use(ElementPlus, { locale })
// app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(router)
app.use(store)
// 定义全局变量
app.config.globalProperties.$post = post
app.config.globalProperties.$get = get
app.config.globalProperties.$baseUrl = 'http://172.16.250.25:7084/ocr-batch'
app.mount('#app')
