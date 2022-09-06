import Vue from "vue";

export const autoFocus = {
  install() {
    // 自定义指令--实现自动聚焦
    Vue.directive("autofocus", {
      inserted(el) {
        if (el.nodeName === "INPUT" || el.nodeName === "TEXTAREA") {
          // 如果是input或者textarea直接聚焦
          el.focus();
        } else {
          // 指令在vant组件内，获取的是组件根标签div，而input标签在组件内部，需要获取
          const theInputEl = el.querySelector("input");
          const textAreaEl = el.querySelector("textarea");

          // 如果找到
          if (theInputEl || textAreaEl) {
            theInputEl && theInputEl.focus();
            textAreaEl && textAreaEl.focus();
          } else {
            // 本身不是，子标签也没找到
            console.error("请把自定义组件v-autofocus用在输入框标签内");
          }
        }
      },
    });
  },
};
