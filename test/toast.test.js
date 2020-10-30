const expect = chai.expect
import Vue from 'vue'
import Toast from '../src/toast'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Toast', () => {
  // 行为驱动测试
  it('存在', () => {
    expect(Toast).to.exist
  })

  describe('props', () => {
    it('传入 autoClose', (done) => {
      let div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Toast)
      let toast = new Constructor({
        propsData: {
          autoClose: 1
        }
      }).$mount(div)
      setTimeout(() => {
        expect(document.body.contains(toast.$el)).to.eq(false)
        done()
      }, 1500)
    })
  })

  it('传入 closeButton', (done) => {
    let callback = sinon.fake()
    const Constructor = Vue.extend(Toast)
    let toast = new Constructor({
      propsData: {
        closeButton: {
          text: '关闭了',
          callback
        }
      }
    }).$mount()
    let closeButton = toast.$el.querySelector('.close')
    expect(closeButton.textContent.trim()).to.eq('关闭了')
    setTimeout(() => {
      closeButton.click()
      expect(callback).to.have.been.called
      done()
    }, 0)
  })

  it('传入 enableHtml', () => {
    const Constructor = Vue.extend(Toast)
    let toast = new Constructor({
      propsData: {
        enableHtml: true
      }
    })
    toast.$slots.default = ['<strong id="test">hi</strong>']
    toast.$mount()
    let strong = toast.$el.querySelector('#test')
    expect(strong).to.exist
  })

  it('传入 position', () => {
    const Constructor = Vue.extend(Toast)
    let toast = new Constructor({
      propsData: {
        position: 'bottom'
      }
    }).$mount()
    expect(toast.$el.classList.contains('position-bottom')).to.eq(true)
  })
})