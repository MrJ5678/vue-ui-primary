const expect = chai.expect
import Vue from 'vue'
import Row from '@/row'
import Col from '@/col'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
  // 行为驱动测试
  it('存在', () => {
    expect(Col).to.exist
  })

  describe('props', () => {

    it('可以传 span', () => {
      const Construtor = Vue.extend(Col)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Construtor({
        propsData: {
          span: '1'
        }
      }).$mount(div)
      const element = vm.$el
      expect(vm.$el.classList.contains('col-1')).to.eq(true)
      vm.$el.remove()
      vm.$destroy()
    })

    it('可以传 offset', () => {
      const Construtor = Vue.extend(Col)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Construtor({
        propsData: {
          offset: '1'
        }
      }).$mount(div)
      const element = vm.$el
      expect(vm.$el.classList.contains('offset-1')).to.eq(true)
      vm.$el.remove()
      vm.$destroy()
    })

    it('可以传 pc object', () => {
      const Construtor = Vue.extend(Col)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Construtor({
        propsData: {
          pc: {span: 1, offset: 2}
        }
      }).$mount(div)
      const element = vm.$el
      expect(vm.$el.classList.contains('col-pc-1')).to.eq(true)
      expect(vm.$el.classList.contains('offset-pc-2')).to.eq(true)
      vm.$el.remove()
      vm.$destroy()
    })

    it('可以传 pad object', () => {
      const Construtor = Vue.extend(Col)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Construtor({
        propsData: {
          pad: {span: 1, offset: 2}
        }
      }).$mount(div)
      const element = vm.$el
      expect(vm.$el.classList.contains('col-pad-1')).to.eq(true)
      expect(vm.$el.classList.contains('offset-pad-2')).to.eq(true)
      vm.$el.remove()
      vm.$destroy()
    })

    it('可以传 narrow-pc object', () => {
      const Construtor = Vue.extend(Col)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Construtor({
        propsData: {
          narrowPc: {span: 1, offset: 2}
        }
      }).$mount(div)
      const element = vm.$el
      expect(vm.$el.classList.contains('col-narrow-pc-1')).to.eq(true)
      expect(vm.$el.classList.contains('offset-narrow-pc-2')).to.eq(true)
      vm.$el.remove()
      vm.$destroy()
    })

    it('可以传 pc object', () => {
      const Construtor = Vue.extend(Col)
      const div = document.createElement('div')
      document.body.appendChild(div)
      const vm = new Construtor({
        propsData: {
          pc: {span: 1, offset: 2}
        }
      }).$mount(div)
      const element = vm.$el
      expect(vm.$el.classList.contains('col-pc-1')).to.eq(true)
      expect(vm.$el.classList.contains('offset-pc-2')).to.eq(true)
      vm.$el.remove()
      vm.$destroy()
    })
  })
})