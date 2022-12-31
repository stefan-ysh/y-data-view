import { createPinia } from "pinia";
import { createApp } from "vue";
import naive from "naive-ui";
import App from "./App.vue";
// 通用字体
// import 'vfonts/Lato.css'
// 等宽字体
// import 'vfonts/FiraCode.css'
const app = createApp(App);
app.use(naive);
app.use(createPinia());
app.mount("#app");
