<template>
  <div class="popover" @click="xxx" >
    <div class="content-wrapper" v-if="visible" @click.stop>
      <slot name="content"></slot>
    </div>
    <slot></slot>
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
    xxx(e) {
      this.visible = !this.visible

      if(this.visible === true) {
        setTimeout(() => {
          let eventHandler = () => {
            this.visible = false
            document.removeEventListener('click', eventHandler)
          }
          document.addEventListener('click', eventHandler)
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.popover {
  position: relative;
  display: inline-block;vertical-align: top;

  .content-wrapper {
    position: absolute;
    bottom: 100%;
    left: 0;
    border: 1px solid red;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, .5);
  }
}
</style>