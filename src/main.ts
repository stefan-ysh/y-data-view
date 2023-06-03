import { createPinia } from "pinia";
import { createApp } from "vue";
import naive from "naive-ui";
import App from "./App.vue";
import { i18n } from "@/lang/index";
// 通用字体
// import 'vfonts/Lato.css'
// 等宽字体
// import 'vfonts/FiraCode.css'
// router
import router from "./router";

const app = createApp(App);
app.use(i18n);
app.use(naive);
app.use(router);
app.use(createPinia());
app.mount("#app");
