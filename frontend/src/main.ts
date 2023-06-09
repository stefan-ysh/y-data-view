import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "@/lang/index";
import PrimeVue from 'primevue/config';
//theme
// import "primevue/resources/themes/md-dark-indigo/theme.css";  
// import "primevue/resources/themes/md-light-indigo/theme.css";  
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css';
//core
import "primevue/resources/primevue.min.css";
// 通用字体
// import 'vfonts/Lato.css'
// 等宽字体
// import 'vfonts/FiraCode.css'
// router
import router from "./router";

const app = createApp(App);
app.use(i18n);
app.use(PrimeVue);
app.use(router);
app.use(ToastService);
app.use(createPinia());
app.mount("#app");
