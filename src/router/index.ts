import { createRouter, createWebHistory } from "vue-router";
import Designer from "@/views/Designer.vue";
import Home from "@/views/Home.vue";
const routes: any = [
  {
    path: "/",
    name: "Index",
    redirect: '/home',
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/design",
    name: "Design",
    component: Designer,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
