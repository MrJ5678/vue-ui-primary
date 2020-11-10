<template>
  <div class="popover" ref="popover">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible"
         :class="{[`position-${position}`]: true}">
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper" style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "GPopover",
  data() {
    return {
      visible: false,
    }
  },
  mounted() {
    if(this.trigger === 'click') {
      this.$refs.popover.addEventListener('click', this.onClick)
    } else {
      this.$refs.popover.addEventListener('mouseenter', this.open)
      this.$refs.popover.addEventListener('mouseleave', this.close)
    }
  },
  destroyed() {
    if(this.trigger === 'click') {
      this.$refs.popover.removeEventListener('click', this.onClick)
    } else {
      this.$refs.popover.removeEventListener('mouseenter', this.open)
      this.$refs.popover.removeEventListener('mouseleave', this.close)
    }
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].indexOf(value) >= 0
      }
    },
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return ['click', 'hover'].indexOf(value) >= 0;
      }
    }
  },
  methods: {
    positionContent() {
      const { contentWrapper, triggerWrapper } = this.$refs
      document.body.appendChild(contentWrapper)
      let { top, left, height, width } = triggerWrapper.getBoundingClientRect()
      let {height: height2 } = contentWrapper.getBoundingClientRect()

      let positions = {
        top: {
          left: left + window.scrollX,
          top: top + window.scrollY,
        },
        bottom: {
          left: left + window.scrollX,
          top: top + window.scrollY + height,
        },
        left: {
          left: left + window.scrollX,
          top: top - (height2 - height) / 2 + window.scrollY,
        },
        right: {
          left: left + window.scrollX + width,
          top: top - (height2 - height) / 2 + window.scrollY,
        }
      }
      contentWrapper.style.left = positions[this.position].left + 'px'
      contentWrapper.style.top = positions[this.position].top + 'px'
    },
    onClickDocument(e) {
      if (this.$refs.popover &&
          (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))) {
        return true
      }
      if (this.$refs.contentWrapper &&
          (this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target))) {
        return true
      }
      this.close()
    },
    open() {
      this.visible = true
      setTimeout(() => {
        this.positionContent()
        document.addEventListener('click', this.onClickDocument)
      }, 0)
    },
    close() {
      this.visible = false
      document.removeEventListener('click', this.onClickDocument)
    },
    onClick(event) {
      if (this.$refs.triggerWrapper.contains(event.target)) {
        if (this.visible === true) {
          // console.log('关闭1')
          this.close()
        } else {
          this.open()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$border-color: #333;
$border-radius: 4px;

.popover {
  position: relative;
  display: inline-block;vertical-align: top;
}

.content-wrapper {
  position: absolute;
  padding: .5em 1em;
  border: 1px solid $border-color;
  border-radius: $border-radius;
  //box-shadow: 0 0 3px 0 rgba(0, 0, 0, .5);
  background-color: #fff;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, .5));
  max-width: 20em;
  word-break: break-all;
  &::before,
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    //transform: translateY(-100%);
  }
  &.position-top {
    left: 1em;
    margin-top: -10px;
    transform: translateY(-100%);

    &::before {
      top: 100%;
      border-top-color: black;
    }

    &::after {
      top: calc(100% - 1px);
      border-top-color: #fff;
    }
  }
  &.position-bottom {
    left: 1em;
    margin-top: 10px;
    &::before {
      bottom: 100%;
      border-bottom-color: #000;
    }
    &::after {
      bottom: calc(100% - 1px);
      border-bottom-color: #fff;
    }
  }
  &.position-left {
    margin-left: -10px;
    transform: translateX(-100%);
    &::before, &::after {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      border-left-color: #000;
    }
    &::after {
      left: calc(100% - 1px);
      border-left-color: #fff;
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before, &::after {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      border-right-color: #000;
    }
    &::after {
      right: calc(100% - 1px);
      border-right-color: #fff;
    }
  }
}
</style>