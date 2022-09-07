import Vue from "vue";
import VueRouter from "vue-router";
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
];

// 创建路由对象
const router = new VueRouter({
  routes,
});

export default router;
