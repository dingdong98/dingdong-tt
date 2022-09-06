import Vue from 'vue'

export const autoFocus = {
  install() {
    // 自定义指令--实现自动聚焦
    Vue.directive('autofocus', {
      inserted(el) {
        const theInputEl = el.querySelector('input')
        theInputEl.focus()
      }
    })
  }
}
