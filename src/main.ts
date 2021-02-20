/* eslint-disable */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from "element-plus"
import { store, key } from './store/store'
// 字体
import './style/font/iconfont.css'
import './style/font/iconfont.js'

// 先不考虑按需引入
import "element-plus/lib/theme-chalk/index.css"
// 重置默认样式
import './style/reset.styl'

const app: ReturnType<typeof createApp> = createApp(App)
app.use(router).use(ElementPlus).use(store, key).mount('#app')
