const expect = chai.expect
import Vue from 'vue'
import Button from '../src/button'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Button', () => {
  // 行为驱动测试

  it('存在', () => {
    expect(Button).to.be.ok
  })

  it('可以设置icon值', () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings",
      },
    }).$mount();
    const useElement = vm.$el.querySelector("use");
    expect(useElement.getAttribute("xlink:href")).to.equal("#i-settings");
    vm.$destroy();
  })

  it('可以设置loading状态', () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings",
        loading: true,
      },
    }).$mount();
    let useElements = vm.$el.querySelectorAll("use");
    let href = useElements[0].getAttribute("xlink:href");
    expect(useElements.length).to.equal(1)
    expect(href).to.equal("#i-loading");
    vm.$destroy();
  })

  it('icon默认order值为1', () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings"
      },
    }).$mount(div);
    let svg = vm.$el.querySelector("svg");
    let { order } = window.getComputedStyle(svg);
    expect(order).to.eq("1");
    vm.$destroy();
  })

  it('icon传入iconPosition: right 时,可以设置order值为2', () => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings",
        iconPosition: "right",
      },
    }).$mount(div);
    let svg = vm.$el.querySelector("svg");
    let { order } = window.getComputedStyle(svg);
    expect(order).to.eq("2");
    vm.$destroy();
  })

  it('点击button触发click', () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: "settings",
      },
    }).$mount();

    const callback = sinon.fake()
    vm.$on('click', callback)
    vm.$el.click()
    expect(callback).to.have.been.called
    vm.$destroy();
  })

})