<template>
  <div class="wrapper" :class="toastClasses">
    <div class="toast" ref="toast">
      <div class="message">
        <slot v-if="!enableHtml"></slot>
        <div v-else v-html="$slots.default[0]"></div>
      </div>

      <div class="line" ref="line"></div>
      <span class="close" v-if="closeButton" @click="onClickClose">
        {{ closeButton.text }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GToast",
  props: {
    autoClose: {
      type: [Number, Boolean],
      default: 5,
      validator(value) {
        return value === false || typeof value === 'number';
      }
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
        }, this.autoClose * 1000)
      }
    },
    updateStyles() {
      this.$nextTick(() => {
        // console.log(this.$refs.wrapper.getBoundingClientRect())
        // console.log(this.$refs.line)
        this.$refs.line.style.height = `${this.$refs.toast.getBoundingClientRect().height}px`
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
$animation-duration: .3s;
@keyframes slide-up {
  0% {opacity: 0; transform: translateY(100%);}
  100% {opacity: 1; transform: translateY(0%);}
}
@keyframes slide-down {
  0% {opacity: 0; transform: translateY(-100%);}
  100% {opacity: 1; transform: translateY(0%);}
}
@keyframes fade-in {
  0% {opacity: 0;}
  100% {opacity: 1;}
}

.wrapper {
  position: fixed; left: 50%;transform: translateX(-50%);
  &.position-top {
    top: 0;
    .toast {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      animation: slide-down $animation-duration;
    }
  }
  &.position-middle {
    top: 50%;
    transform: translateY(-50%) translateX(-50%);
    animation: fade-in $animation-duration;
  }
  &.position-bottom {
    bottom: 0;
    .toast {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      animation: slide-up $animation-duration;
    }
  }
}

.toast {
  padding: 0 16px;min-height: $toast-min-height;font-size: $font-size;line-height: 1.8;display: flex;align-items: center;background-color: $toast-bg;border-radius: $border-radius;color: #fff;box-shadow: 0 0 3px rgba(0, 0, 0, .5);
  .message { padding: 8px 0; }
  .close {
    padding-left: 16px;
    flex-shrink: 0;
  }
  .line {
    margin-left: 16px;
    border-left: 1px solid #666;
  }
}
</style>