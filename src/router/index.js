import Vue from "vue";
import VueRouter from "vue-router";
import { getToken } from "@/utils/aboutToken";
Vue.use(VueRouter);

// 路由映射表
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/Login"),
  },
  {
    path: "/layout",
    redirect: "/layout/home",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "home",
        component: () => import("@/views/Home/index.vue"),
      },
      {
        path: "user",
        component: () => import("@/views/User/index.vue"),
      },
    ],
  },
  {
    path: "/search",
    component: () => import("@/views/Search/index.vue"),
  },
  {
    path: "/search/:keywords",
    component: () => import("@/views/Search/SearchResult.vue"),
  },
  {
    path: "/detail",
    component: () => import("@/views/ArticleDetail/index.vue"),
  },
  {
    path: "/user/edit",
    component: () => import("@/views/User/UserDetail.vue"),
  },
  {
    path: "/chat",
    component: () => import("@/views/Chat"),
  },
];

// 创建路由对象
const router = new VueRouter({
  routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 携带token，禁止回到登录页面
  if (getToken()?.length > 0 && to.path === "/login") {
    next(false); //禁止，留在原地
  } else {
    next(true); //放行
  }
});

export default router;
