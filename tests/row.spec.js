const expect = chai.expect
import Vue from 'vue'
import Row from '@/row'
import Col from '@/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
  // 行为驱动测试
  it('存在', () => {
    expect(Row).to.exist
  })

  describe('props', () => {

    it('可以传 gutter', (done) => {
      Vue.component('g-row', Row)
      Vue.component('g-col', Col)
      let div = document.createElement('div')
      document.documentElement.appendChild(div)
      div.innerHTML = `
        <g-row gutter="20">
          <g-col span="12"></g-col>
          <g-col span="12"></g-col>
        </g-row>
      `
      const vm = new Vue({
        el: div
      })
      setTimeout(() => {
        const cols = vm.$el.querySelectorAll('.col')
        const row = vm.$el.querySelector('.row')
        expect(getComputedStyle(row).marginLeft).to.eq('-10px')
        expect(getComputedStyle(row).marginRight).to.eq('-10px')
        expect(getComputedStyle(cols[0]).paddingLeft).to.equal('10px')
        expect(getComputedStyle(cols[1]).paddingRight).to.equal('10px')
        done()
        vm.$el.remove()
        vm.$destroy()
        },0 ) // 延时测试
    })

    it('可以传 align', () => {
      const Constructor = Vue.extend(Row)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Constructor({
        propsData: {
          align: 'left'
        }
      }).$mount(div)
      const element = vm.$el
      expect(getComputedStyle(element).justifyContent).to.eq('flex-start')
      vm.$el.remove()
      vm.$destroy()
    })

  })
})