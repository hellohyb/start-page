import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import lazyPlugin from 'vue3-lazy'
import bg2 from './assets/bg2.png'

createApp(App)
  .use(lazyPlugin, {
    loading: new URL('./assets/bg2.png', import.meta.url).href, // 图片加载时默认图片
    error: new URL('./assets/bg2.png', import.meta.url).href// 图片加载失败时默认图片
  })
  .mount('#app')

