import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
interface RouteName {
  Index: "Index";
  Login: "Login";
  Home: "Home";
  Design: "Design";
}

const RouteNames: RouteName = {
  Index: "Index",
  Login: "Login",
  Home: "Home",
  Design: "Design",
};

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: RouteNames.Index,
    redirect: '/home',
  },
  {
    path: "/login",
    name: RouteNames.Login,
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/home",
    name: RouteNames.Home,
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/design",
    name: RouteNames.Design,
    component: () => import("@/views/Designer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
