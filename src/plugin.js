import Toast from './toast'

let currentToast

export default {
  install(Vue, options) {
    Vue.prototype.$toast = function(message, toastOptions) {
      if(currentToast) { currentToast.close() }
      currentToast = createToast({
        Vue,
        message,
        propsData: toastOptions,
        onClose() {
          currentToast = null
        }
      })
    }
  }
}






























/* helpers */
function createToast({Vue, message, propsData, onClose }) {
  let Constructor = Vue.extend(Toast)
  let vm = new Constructor({ propsData })
  vm.$slots.default = [message]
  vm.$mount()
  vm.$on('beforeClose', onClose)
  document.body.appendChild(vm.$el)
  return vm
}