import { createRouter, createWebHistory } from "vue-router";
const routes: any = [
  {
    path: "/",
    name: "Index",
    redirect: '/home',
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/design",
    name: "Design",
    component: () => import("@/views/Designer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
