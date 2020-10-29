import Toast from './toast'

let currentToast

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function(message, toastOptions) {
      if(currentToast) { currentToast.close() }
      currentToast = createToast({Vue, message, propsData: toastOptions})
    }
  }
}






























/* helpers */
function createToast({Vue, message, propsData }) {
  let Constructor = Vue.extend(Toast)
  let vm = new Constructor({ propsData })
  vm.$slots.default = [message]
  vm.$mount()
  document.body.appendChild(vm.$el)
  return vm
}