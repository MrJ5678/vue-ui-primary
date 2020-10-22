import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)

new Vue({
  el: '#app',
  data() {
    return {
      loading1: false,
      loading2: false,
      loading3: false,
    }
  }
})

// 单元测试
// import chai from 'chai'
// const expect = chai.expect
//
// import spies from 'chai-spies'
// chai.use(spies)
//
// try {
//   {
//     // 测试按钮含有 icon
//     const Constructor = Vue.extend(Button)
//     const vm = new Constructor({
//       propsData: {
//         icon: 'settings'
//       }
//     })
//     vm.$mount()
//     let useElement = vm.$el.querySelector('use')
//     expect(useElement.getAttribute('xlink:href')).to.eq('#i-settings')
//     vm.$el.remove()
//     vm.$destroy()
//   }
//   {
//     const Constructor = Vue.extend(Button)
//     const vm = new Constructor({
//       propsData: {
//         icon: 'settings',
//         loading: true
//       }
//     })
//     vm.$mount()
//     let useElement = vm.$el.querySelector('use')
//     expect(useElement.getAttribute('xlink:href')).to.eq('#i-loading')
//     vm.$el.remove()
//     vm.$destroy()
//   }
//   {
//     const div = document.createElement('div')
//     document.body.appendChild(div)
//     const Constructor = Vue.extend(Button)
//     const vm = new Constructor({
//       propsData: {
//         icon: 'settings'
//       }
//     })
//     vm.$mount(div)
//     let svg = vm.$el.querySelector('svg')
//     let { order } = window.getComputedStyle(svg)
//     expect(order).to.eq('1')
//     vm.$el.remove()
//     vm.$destroy()
//   }
//   {
//     const div = document.createElement('div')
//     document.body.appendChild(div)
//     const Constructor = Vue.extend(Button)
//     const vm = new Constructor({
//       propsData: {
//         icon: 'settings',
//         iconPosition: 'right'
//       }
//     })
//     vm.$mount(div)
//     let svg = vm.$el.querySelector('svg')
//     let { order } = window.getComputedStyle(svg)
//     expect(order).to.eq('2')
//     vm.$el.remove()
//     vm.$destroy()
//   }
//   {
//     const Constructor = Vue.extend(Button)
//     let vm = new Constructor({
//       icon: 'settings'
//     })
//     vm.$mount()
//     let spy = chai.spy(function() {})
//     vm.$on('click', spy)
//     let button = vm.$el
//     button.click()
//     expect(spy).to.have.been.called()
//   }
// }catch (e) {
//   window.errors = [e]
// }finally {
//   window.errors && window.errors.forEach(error => {
//     console.error(error.message)
//   })
// }
