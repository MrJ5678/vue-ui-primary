import Toast from './toast'

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function(message, toastOptions) {
      let Constructor = Vue.extend(Toast)
      let vm = new Constructor({
        propsData: toastOptions
      })
      vm.$slots.default = [message]
      vm.$mount()
      document.body.appendChild(vm.$el)
    }
  }
}