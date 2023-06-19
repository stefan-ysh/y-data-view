import { createPinia } from "pinia";
import { createApp } from "vue";
import naive from "naive-ui";
import App from "./App.vue";
import { i18n } from "@/lang/index";
import { setupSvgIcon } from './plugin/SvgIcon/index'
import setupDirective from './plugin/directive/index'
import component from "./packages/register/component";
// 注册自定义svg组件
import 'virtual:svg-icons-register';
// 通用字体
// import 'vfonts/Lato.css'
// 等宽字体
// import 'vfonts/FiraCode.css'
// router
import router from "./router";

const app = createApp(App);
setupSvgIcon(app)
setupDirective(app)
app.use(i18n);
app.use(naive);
app.use(component);
app.use(router);
app.use(createPinia());
app.mount("#app");
