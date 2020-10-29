import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Layout from './layout'
import Header from './header'
import Sider from './sider'
import Content from './content'
import Footer from './footer'
import Toast from './toast'
import plugin from "./plugin";

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
Vue.component('g-layout', Layout)
Vue.component('g-sider', Sider)
Vue.component('g-header', Header)
Vue.component('g-content', Content)
Vue.component('g-footer', Footer)
Vue.component('g-toast', Toast)
Vue.use(plugin)

new Vue({
  el: '#app',
  data() {
    return {
      loading1: false,
      loading2: false,
      loading3: false,
      message: 'hi'
    }
  },
  created() {
    this.$toast('单行文字，完', {
      closeButton: {
        text: '知道了',
        callback(toast) {
          toast.log()
          console.log('用户说它知道了')
        }
      },
      enableHtml: false,
      autoClose: true,
      autoCloseDelay: 20,
      position: 'middle'
    })
  },
  methods: {
    showToast() {
    }
  }
})
