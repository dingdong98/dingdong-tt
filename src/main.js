import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "amfe-flexible"; // 引入移动端适配方案
import { autoFocus } from "@/utils/focus";

// 全局引入vant
import Vant from "vant";
import "vant/lib/index.less";
Vue.use(Vant);
Vue.use(autoFocus);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
