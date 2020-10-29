<template>
  <div class="toast" ref="wrapper" :class="toastClasses">
    <div class="message">
      <slot v-if="!enableHtml"></slot>
      <div v-else v-html="$slots.default[0]"></div>
    </div>

    <div class="line" ref="line"></div>
    <span class="close" v-if="closeButton" @click="onClickClose">
      {{ closeButton.text }}
    </span>
  </div>
</template>

<script>
export default {
  name: "GToast",
  props: {
    autoClose: {
      type: Boolean,
      default: true
    },
    autoCloseDelay: {
      type: Number,
      default: 20
    },
    closeButton: {
      type: Object,
      default() {
        return {
          text: '关闭',
          callback: undefined
        }
      }
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'middle'].indexOf(value) >= 0
      }
    }
  },
  computed: {
    toastClasses() {
      return {[`position-${ this.position }`]: true}
    }
  },
  mounted() {
    this.updateStyles()
    this.execAutoClose()
  },
  methods: {
    execAutoClose() {
      if(this.autoClose) {
        setTimeout(() => {
          this.close()
        }, this.autoCloseDelay * 1000)
      }
    },
    updateStyles() {
      this.$nextTick(() => {
        // console.log(this.$refs.wrapper.getBoundingClientRect())
        this.$refs.line.style.height = this.$refs.wrapper.getBoundingClientRect().height + 'px'
      })
    },
    close() {
      this.$el.remove()
      this.$emit('beforeClose')
      this.$destroy()
    },
    log() {
      console.log('测试')
    },
    onClickClose() {
      this.close()
      this.closeButton && this.closeButton.callback && this.closeButton.callback(this)
    }
  }
}
</script>

<style lang="scss" scoped>
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: rgba(0, 0, 0, .75);
$border-radius: 4px;

.toast {
  position: fixed;padding: 0 16px;min-height: $toast-min-height;font-size: $font-size;line-height: 1.8;display: flex;align-items: center;background-color: $toast-bg;border-radius: $border-radius;color: #fff;box-shadow: 0 0 3px rgba(0, 0, 0, .5);
  left: 50%;
  .message { padding: 8px 0; }
  .close {
    padding-left: 16px;
    flex-shrink: 0;
  }
  .line {
    margin-left: 16px;
    height: 100%;
    border-left: 1px solid #666;
  }
  &.position-top {
    top: 0;
    transform: translateX(-50%);
  }
  &.position-middle {
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &.position-bottom {
    bottom: 0;
    transform: translateX(-50%);
  }
}
</style>