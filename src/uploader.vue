<template>
  <div class="g-uploader">
    <div @click="onClickUpload">
      <slot></slot>
    </div>

    <ol class="g-uploader-fileList">
      <li v-for="file in fileList" :key="file.name">
        <template v-if="file.status === 'uploading'">
          <g-icon name="loading" class="g-uploader-spin"></g-icon>
        </template>
        <template v-else-if="file.type.indexOf('image') === 0">
          <img class="g-uploader-image" :src="file.url" width="32" height="32">
        </template>
        <template v-else>
          <div class="g-uploader-defaultImage"></div>
        </template>
        <span class="g-uploader-name" :class="{[file.status]: file.status}">
          {{ file.name }}
        </span>
        <button class="g-uploader-remove" @click="onRemoveFile(file)">x</button>
      </li>
    </ol>

    <div ref="temp" style="width: 0; height: 0; overflow: hidden;"></div>
  </div>
</template>

<script>
import Icon from './icon'
import http from './http'

export default {
  name: 'GUploader',
  components: {
    'g-icon': Icon,
  },
  props: {
    name: {type: String, required: true},
    action: {type: String, required: true},
    method: {type: String, default: 'POST'},
    parseResponse: {type: Function, required: true},
    fileList: {type: Array, default: () => []},
    sizeLimit: {type: Number}
  },
  data() {
    return {
      url: 'about:blank'
    }
  },
  methods: {
    onRemoveFile(file) {
      let answer = window.confirm('确定删除吗？')
      if (answer) {
        let copy = [...this.fileList]
        // let index = copy.indexOf(file)
        // copy.splice(index, 1)
        copy = copy.filter(item => item !== file)
        this.$emit('update:fileList', copy)
      }
    },
    onClickUpload() {
      let input = this.createInput()
      // listen to input
      input.addEventListener('change', () => {
        // this.uploadFile(input.files[0]) // 单文件
        console.log('change 事件被触发')
        this.uploadFiles(input.files)
        input.remove()
      })
      // trigger click
      input.click()
    },
    beforeUploadFiles(rawFiles, newNames) {
      rawFiles = Array.from(rawFiles)
      for (let i = 0; i < rawFiles.length; i++) {
        let {size} = rawFiles[i]
        if(size > this.sizeLimit) {
          this.$emit('error', `文件大于 ${this.sizeLimit} kb`)
          return false
        }
      }

      let x = rawFiles.map((rawFile, i) => {
        let {type, size} = rawFile
        return {name: newNames[i], type, size, status: 'uploading'}
      })
      this.$emit('update:fileList', [...this.fileList, ...x])
      return true
    },
    afterUploadFiles(newName, url) {
      let file = this.fileList.filter(file => file.name === newName)[0]
      let index = this.fileList.indexOf(file)
      let fileCopy = JSON.parse(JSON.stringify(file))
      fileCopy.url = url
      fileCopy.status = 'success'

      let fileListCopy = [...this.fileList]
      fileListCopy.splice(index, 1, fileCopy)
      this.$emit('update:fileList', fileListCopy)
    },
    uploadFiles(rawFiles) {
      let newNames = []
      for (let i = 0; i < rawFiles.length; i++) {
        let rawFile = rawFiles[i]
        let {name} = rawFile
        let newName = this.generateName(name)
        newNames[i] = newName
      }
      if(!this.beforeUploadFiles(rawFiles, newNames)) {return false}
      for (let i = 0; i < rawFiles.length; i++) {
        let rawFile = rawFiles[i]
        let newName = newNames[i]
        let formData = new FormData()
        formData.append(this.name, rawFile)
        this.doUpdateFiles(formData, (response) => {
          let url = this.parseResponse(response)
          this.url = url
          this.afterUploadFiles(newName, url)
        }, (xhr) => {
          this.uploadError(xhr, newName)
        })
      }
    },


    uploadError(xhr, newName) {
      let file = this.fileList.filter(file => file.name === newName)[0]
      let index = this.fileList.indexOf(file)
      let fileCopy = JSON.parse(JSON.stringify(file))
      fileCopy.status = 'fail'
      let fileListCopy = [...this.fileList]
      fileListCopy.splice(index, 1, fileCopy)
      this.$emit('update:fileList', fileListCopy)
      let error = ''
      if(xhr.status === 0) {
        error = '网络无法连接'
      }
      this.$emit('error', error)
    },
    generateName(name) {
      while (this.fileList.filter(file => file.name === name).length > 0) {
        let dotIndex = name.lastIndexOf('.')
        let nameWithoutExtension = name.substring(0, dotIndex)
        let extension = name.substring(dotIndex)
        name = nameWithoutExtension + '(1)' + extension
      }
      return name
    },
    doUpdateFiles(formData, success, fail) {
      http[this.method.toLowerCase()](this.action, {success, fail, data: formData})
    },
    createInput() {
      this.$refs.temp.innerHTML = ''
      // create input
      let input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.multiple = true
      this.$refs.temp.appendChild(input)
      return input
    },
  }
}
</script>

<style lang="scss" scoped>
@import "var";

.g-uploader {
  &-fileList {
    list-style: none;
    > li {
      display: flex;
      align-items: center;
      margin: 8px 0;
      border: 1px solid darken($grey, 20%);
    }
  }

  &-image {
    margin-right: 8px;
    vertical-align: middle;
  }

  &-defaultImage {
    width: 32px;
    height: 32px;
  }

  &-name {
    margin-right: auto;
    &.success {
      color: green;
    }
    &.fail {
      color: red;
    }
    &.uploading {
      color: $grey;
    }
  }
  &-remove {
    width: 32px;
    height: 32px;
  }
  &-spin {
    width: 32px;
    height: 32px;
    @include spin;
  }
}
</style>