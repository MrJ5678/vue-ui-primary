import Vue from "vue";
import chai, { expect } from "chai";
import { mount } from "@vue/test-utils";
import Nav from "@/nav/nav";
import NavItem from "@/nav/nav-item";
import SubNav from "@/nav/sub-nav";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import Button from "@/button/button";

chai.use(sinonChai);

describe("Nav", () => {
  it("存在", () => {
    expect(Nav).to.exist;
  });

  it("可以设置 selected", (done) => {
    Vue.component("g-nav-item", NavItem);
    Vue.component("g-sub-nav", SubNav);
    let wrapper = mount(Nav, {
      propsData: {
        selected: "home"
      },
      slots: {
        default: `
          <g-nav-item name="home">首页</g-nav-item>
          <g-sub-nav name="about">
            <template slot="title">关于</template>
            <g-nav-item name="culture">企业文化</g-nav-item>
            <g-nav-item name="developers">开发团队</g-nav-item>
          </g-sub-nav>
          <g-nav-item name="hire">招聘</g-nav-item>
        `
      }
    });
    setTimeout(() => {
      expect(wrapper.find('[data-name="home"].selected').exists()).to.be.true
      done()
    })
  });

  it('会出发 update:selected 事件', (done) => {
    Vue.component("g-nav-item", NavItem);
    Vue.component("g-sub-nav", SubNav);
    const callback = sinon.fake()
    let wrapper = mount(Nav, {
      propsData: {
        selected: "home"
      },
      slots: {
        default: `
          <g-nav-item name="home">首页</g-nav-item>
          <g-sub-nav name="about">
            <template slot="title">关于</template>
            <g-nav-item name="culture">企业文化</g-nav-item>
            <g-nav-item name="developers">开发团队</g-nav-item>
          </g-sub-nav>
          <g-nav-item name="hire">招聘</g-nav-item>
        `
      },
      listeners: {
        'update:selected': callback
      }
    });

    wrapper.find('[data-name="developers"]').trigger('click')
    expect(callback).to.have.been.calledWith('developers')
    done()
  })
});
