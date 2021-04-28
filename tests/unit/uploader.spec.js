import chai, { expect } from "chai";
import { mount } from "@vue/test-utils";
import Uploader from "../../src/uploader"
import sinon from "sinon";
import sinonChai from "sinon-chai";
import http from '../../src/http'

chai.use(sinonChai);

describe('Uploader.vue', () => {
  it('存在.', () => {
    expect(Uploader).to.exist
  })
  it('可以上传一个文件', (done) => {
    let stub = sinon.stub(http, 'post').callsFake((url, options) => {
      setTimeout(function () {
        options.success('{"id": "123123"}')
      }, 100)
    })

    const wrapper = mount(Uploader, {
      propsData: {
        name: 'file',
        action: '/upload',
        method: 'post',
        parseResponse: (response) => {
          let object = JSON.parse(response)
          return `/preview/${object.id}`
        },
        fileList: []
      },
      slots: {default: `<button id="x">click me</button>`},
      listeners: {
        'update:fileList': (fileList) => { wrapper.setProps({fileList}) },
        'uploaded': () => {
          expect(wrapper.find('use').exists()).to.eq(false)
          expect(wrapper.props().fileList[0].url).to.eq('/preview/123123')
          stub.restore()
          done()
        }
      }
    })
    wrapper.find('#x').trigger('click')
    let inputWrapper = wrapper.find('input[type="file"]')
    let input = inputWrapper.element
    let file1 = new File(['xxx'], 'xxx.txt')
    let file2 = new File(['yyy'], 'yyy.txt')

    const data = new DataTransfer()
    data.items.add(file1)
    data.items.add(file2)
    input.files = data.files;
    console.log(data.items)
    console.log(wrapper.html())
    console.log(input)
    console.log(input.files)

    let use = wrapper.find('use').element
    expect(use.getAttribute('xlink:href')).to.eq('#i-loading')

  })
})