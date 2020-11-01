<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="actions-wrapper">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GTabsHead",
  inject: ['eventBus'],
  mounted() {
    this.eventBus.$on('update:selected', (item, vm) => {
      let {width, height, top, left} = vm.$el.getBoundingClientRect()
      console.log(width, height, top, left)
      this.$refs.line.style.width = `${width}px`
      this.$refs.line.style.transform = `translateX(${left}px)`
    })
  },
}
</script>

<style lang="scss" scoped>
$tab-height: 40px;
$blue: #1890ff;

.tabs-head {
  position: relative;
  display: flex;
  height: $tab-height;
  justify-content: flex-start;
  > .line {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid $blue;
    transition: all .3s;
  }

  .actions-wrapper { margin-left: auto; }
}
</style>