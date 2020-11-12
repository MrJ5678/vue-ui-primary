const expect = chai.expect
import Vue from 'vue'
import Tabs from '@/tabs'
import TabsHead from '@/tabs-head'
import TabsBody from "@/tabs-body";
import TabsItem from "@/tabs-item";
import TabsPane from "@/tabs-pane";

Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('TabsItem', () => {
  // 行为驱动测试
  it('存在', () => {
    expect(TabsItem).to.exist
  })

  it('传入 name 属性', () => {
    const Constructor = Vue.extend(TabsItem)
    let vm = new Constructor({
      propsData: {
        name: 'vue'
      }
    }).$mount()
    expect(vm.$el.getAttribute('data-name')).to.eq('vue')
  })

  it('传入 disabled 属性', () => {
    const Constructor = Vue.extend(TabsItem)
    let vm = new Constructor({
      propsData: {
        disabled: true,
        name: 'vue'
      }
    }).$mount()
    // expect(vm.$el.classList.contains('disabled')).to.eq(true)
    // setTimeout(() => {
    //   const callback = sinon.fake()
    //   vm.$on('click', callback)
    //   vm.$el.click()
    //   expect(callback).to.not.have.been.called
    //   done()
    // }, 0)
    const callback = sinon.fake()
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.not.have.been.called
  })

  it('可以接受 direction', () => {

  })
})