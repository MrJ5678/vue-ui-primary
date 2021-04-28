<template>
  <div style="margin: 20px;">
    {{error}}
    <br>
    {{fileList}}
    <div>只能上传小于 300kb 的 png、jpeg 文件</div>
    <g-uploader
        accpet="image/*"
        method="POST"
        action="http://127.0.0.1:3000/upload"
        name="file"
        :parse-response="parseResponse"
        :file-list.sync="fileList"
        @error="error = $event"
    >
      <g-button icon="upload">上传</g-button>
    </g-uploader>
  </div>
</template>

<script>
import Uploader from './uploader'
import Button from '@/button/button'

export default {
  name: "Demo",
  components: {
    'g-uploader': Uploader,
    'g-button': Button

  },
  data() {
    return {
      fileList: [],
      error: ''
    }
  },
  methods: {
    parseResponse(response) {
      let object = JSON.parse(response)
      let url = `http://127.0.0.1:3000/preview/${object.id}`
      return url
    },
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  --font-size: 14px;
}

body {
  font-size: var(--font-size);
}

.g-button {
  svg {
    font-size: 1.8em;
  }
}
</style>