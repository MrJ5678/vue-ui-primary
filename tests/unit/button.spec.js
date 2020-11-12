import chai, { expect } from "chai";
import { mount } from "@vue/test-utils";
import Button from "@/button";
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

  xit("icon默认order值为1", () => {
    let wrapper = mount(Button, {
      propsData: {
        icon: "settings"
      }
    });
    let vm = wrapper.vm
    let svg = vm.$el.querySelector("svg");
    let { order } = window.getComputedStyle(svg);
    expect(order).to.eq("1");
  });

  xit("icon传入iconPosition: right 时,可以设置order值为2", () => {
    let wrapper = mount(Button, {
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
