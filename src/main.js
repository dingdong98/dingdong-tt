import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible"; // 引入移动端适配方案
import { autoFocus } from "@/utils/focus";
// 注册图片懒加载组件
import { Lazyload } from "vant";
Vue.use(Lazyload);

// 全局引入vant
import Vant from "vant";
import "vant/lib/index.less";
Vue.use(Vant);
Vue.use(autoFocus);
Vue.config.productionTip = false;
console.log(process.env);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
