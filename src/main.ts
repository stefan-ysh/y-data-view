import { createApp } from 'vue'
import naive from 'naive-ui'
// 通用字体
// import 'vfonts/Lato.css'
// 等宽字体
// import 'vfonts/FiraCode.css'

import App from './App.vue'
const app = createApp(App)
app.use(naive)
app.mount('#app')
