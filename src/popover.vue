<template>
  <div class="popover" @click="onClick" ref="popover">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
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
      visible: false
    }
  },
  methods: {
    positionContent() {
      document.body.appendChild(this.$refs.contentWrapper)
      let { top, left } = this.$refs.triggerWrapper.getBoundingClientRect()
      this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
      this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
    },
    onClickDocument(e) {
      // if (this.$refs.popover &&
      //     (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))) {
      //   return true
      // }
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
  transform: translateY(-100%);
  margin-top: -10px;
  max-width: 20em;
  word-break: break-all;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 1em;
    display: block;
    width: 0px;
    height: 0px;
    border: 10px solid transparent;
  }

  &::before {
    top: 100%;
    border-top-color: black;
  }

  &::after {
    top: calc(100% - 1px);
    border-top-color: #fff;
  }
}
</style>