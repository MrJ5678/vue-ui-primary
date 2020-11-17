import Vue from 'vue'
import chai, { expect } from "chai";
import { mount } from "@vue/test-utils";
import Slides from "@/slides";
import SlidesItem from '@/slides-item'
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

describe("Slides", () => {
  // 行为驱动测试

  it("存在", () => {
    expect(Slides).to.be.ok;
  });

  it("接受 GSlidesItem, 默认展示第一个", (done) => {
    Vue.component('GSlidesItem', SlidesItem)

    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false
      },
      slots: {
        default:  `
          <g-slides-item name="1">
            <div class="box1">1</div>
          </g-slides-item>
          <g-slides-item name="2">
            <div class="box2">2</div>
          </g-slides-item>
          <g-slides-item name="3">
            <div class="box3">3</div>
          </g-slides-item>
        `
      }
    })
    setTimeout(() => {
      expect(wrapper.find('.box1').exists()).to.be.true
      done()
    })
  })

  it('selected 是多少, 选中的就是多少', (done) => {
    Vue.component('GSlidesItem', SlidesItem)

    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
        selected: '2'
      },
      slots: {
        default:  `
          <g-slides-item name="1">
            <div class="box1">1</div>
          </g-slides-item>
          <g-slides-item name="2">
            <div class="box2">2</div>
          </g-slides-item>
          <g-slides-item name="3">
            <div class="box3">3</div>
          </g-slides-item>
        `
      }
    })
    setTimeout(() => {
      expect(wrapper.find('.box2').exists()).to.be.true
      done()
    })
  })

  it('点击第二个, 展示第二个', (done) => {
    Vue.component('GSlidesItem', SlidesItem)

    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: false,
        selected: '1',
      },
      slots: {
        default:  `
          <g-slides-item name="1">
            <div class="box1">1</div>
          </g-slides-item>
          <g-slides-item name="2">
            <div class="box2">2</div>
          </g-slides-item>
          <g-slides-item name="3">
            <div class="box3">3</div>
          </g-slides-item>
        `
      },
      listeners: {
        'update:selected': (x) => { expect(x).to.eq('2')}
      }
    })
    setTimeout(() => {
      wrapper.find('[data-index="1"]').trigger('click')
      done()
    })
  })

  it('会自动播放', (done) => {
    Vue.component('GSlidesItem', SlidesItem)
    const callback = sinon.fake()
    const wrapper = mount(Slides, {
      propsData: {
        autoPlay: true,
        selected: '1',
        autoPlayDelay: 20
      },
      slots: {
        default:  `
          <g-slides-item name="1">
            <div class="box1">1</div>
          </g-slides-item>
          <g-slides-item name="2">
            <div class="box2">2</div>
          </g-slides-item>
          <g-slides-item name="3">
            <div class="box3">3</div>
          </g-slides-item>
        `
      },
      listeners: {
        'update:selected': callback
      }
    })
    setTimeout(() => {
      wrapper.find('[data-index="1"]').trigger('click')
      expect(callback).to.have.been.calledWith('2')
      done()
    }, 21)
  })

});
