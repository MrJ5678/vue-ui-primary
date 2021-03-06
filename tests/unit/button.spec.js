import chai, { expect } from "chai";
import { mount } from "@vue/test-utils";
import Button from "@/button/button";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

describe("Button", () => {
  // 行为驱动测试

  it("存在", () => {
    expect(Button).to.be.ok;
  });

  it("可以设置icon值", () => {
    let wrapper = mount(Button, {
      propsData: {
        icon: "settings"
      }
    });
    const useElement = wrapper.find("use")
    expect(useElement.attributes()['href']).to.equal("#i-settings");
  });

  it("可以设置loading状态", () => {
    let wrapper = mount(Button, {
      propsData: {
        icon: "loading"
      }
    });
    let vm = wrapper.vm
    let useElements = vm.$el.querySelectorAll("use");
    let href = useElements[0].getAttribute("xlink:href");
    expect(useElements.length).to.equal(1);
    expect(href).to.equal("#i-loading");
  });

  it("icon 默认 order 值为1", () => {
    const elem = document.createElement('div')
    if (document.body) {
      document.body.appendChild(elem)
    }
    let wrapper = mount(Button, {
      attachTo: elem,
      propsData: {
        icon: "settings"
      }
    });
    let vm = wrapper.vm
    let svg = vm.$el.querySelector("svg");
    let { order } = window.getComputedStyle(svg);
    expect(order).to.eq("1");
  });

  it("icon 传入 iconPosition: right 时,可以设置 order 值为2", () => {
    const elem = document.createElement('div')
    if (document.body) {
      document.body.appendChild(elem)
    }
    let wrapper = mount(Button, {
      attachTo: elem,
      propsData: {
        icon: "settings",
        iconPosition: "right"
      }
    })
    let vm = wrapper.vm
    let svg = vm.$el.querySelector("svg");
    let { order } = window.getComputedStyle(svg);
    expect(order).to.eq("2");
    vm.$destroy();
  });

  it("点击button触发click", () => {
    let wrapper = mount(Button, {
      propsData: {
        icon: "settings"
      }
    });
    let vm = wrapper.vm;

    const callback = sinon.fake();
    vm.$on("click", callback);
    vm.$el.click();
    expect(callback).to.have.been.called;
    vm.$destroy();
  });
});
