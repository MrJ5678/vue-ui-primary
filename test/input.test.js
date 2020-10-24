const expect = chai.expect
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {
  // 行为驱动测试
  it('存在', () => {
    expect(Input).to.exist
  })

  describe('props', () => {
    const Constructor = Vue.extend(Input);
    let vm
    afterEach(() => {
      vm.$destroy();
    })

    it('可以传 value', () => {
      vm = new Constructor({
        propsData: {
          value: "1234",
        },
      }).$mount();
      const inputElement = vm.$el.querySelector("input");
      // console.dir(inputElement)
      expect(inputElement.value).to.equal("1234");
    })

    it('可以接收 disabled', () => {
      vm = new Constructor({
        propsData: {
          disabled: true,
        },
      }).$mount();
      const inputElement = vm.$el.querySelector("input");
      // console.dir(inputElement)
      expect(inputElement.disabled).to.equal(true);
    })

    it('可以接收 readonly', () => {
      vm = new Constructor({
        propsData: {
          readonly: true,
        },
      }).$mount();
      const inputElement = vm.$el.querySelector("input");
      // console.log(inputElement.outerHTML)
      expect(inputElement.readOnly).to.equal(true);
    })

    it('可以接收 error', () => {
      vm = new Constructor({
        propsData: {
          error: "错误信息",
        },
      }).$mount();
      const useElement = vm.$el.querySelector("use");
      const errContent = vm.$el.querySelector('.error-content')
      expect(useElement.getAttribute('xlink:href')).to.equal("#i-error");
      expect(errContent.innerText).to.equal('错误信息')
    })
  })

  describe('事件', () => {
    const Constructor = Vue.extend(Input);
    let vm
    afterEach(() => {
      vm.$destroy();
    })

    it('支持 change/input/focus/blur 事件', () => {
      ['change', 'input', 'focus', 'blur'].forEach(eventName => {
        vm = new Constructor({}).$mount()
        const callback = sinon.fake()
        vm.$on(eventName, callback)
        // 触发 input change 事件
        let event = new Event(eventName)
        let inputElement = vm.$el.querySelector('input')
        inputElement.dispatchEvent(event)
        expect(callback).to.have.been.calledWith(event)
      })
    })

    // it('支持 input 事件', () => {
    //   vm = new Constructor({}).$mount()
    //   const callback = sinon.fake()
    //   vm.$on('input', callback)
    //   // 触发 input input 事件
    //   let event = new Event('input')
    //   let inputElement = vm.$el.querySelector('input')
    //   inputElement.dispatchEvent(event)
    //   expect(callback).to.have.been.calledWith(event)
    // })

    // it('支持 focus 事件', () => {
    //   vm = new Constructor({}).$mount()
    //   const callback = sinon.fake()
    //   vm.$on('focus', callback)
    //   // 触发 input focus 事件
    //   let event = new Event('focus')
    //   let inputElement = vm.$el.querySelector('input')
    //   inputElement.dispatchEvent(event)
    //   expect(callback).to.have.been.calledWith(event)
    // })

    // it('支持 blur 事件', () => {
    //   vm = new Constructor({}).$mount()
    //   const callback = sinon.fake()
    //   vm.$on('blur', callback)
    //   // 触发 input blur 事件
    //   let event = new Event('blur')
    //   let inputElement = vm.$el.querySelector('input')
    //   inputElement.dispatchEvent(event)
    //   expect(callback).to.have.been.calledWith(event)
    // })
  })
})