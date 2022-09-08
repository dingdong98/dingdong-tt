import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    photoimg:
      // 头像照片地址
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.bq233.com%2Fkanqq%2Fpic%2Fupload%2F2018%2F0807%2F1533622762937587.jpg&refer=http%3A%2F%2Fimg.bq233.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641525704&t=153cb0981835604e6e59e4009251aedd%27%20//%20%E5%A4%B4%E5%83%8F%E5%9C%B0%E5%9D%80(%E9%BB%98%E8%AE%A4%E5%80%BC)",
  },
  getters: {},
  mutations: {
    setPhotoImg(state, payload) {
      console.log(payload);
      state.photoimg = payload;
    },
  },
  actions: {},
  modules: {},
});
