<template>
  <div class="sub-nav">
    <span @click="onClick">
      <slot name="title"></slot>
    </span>
    <div class="sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GSubNav",
  data() {
    return {
      open: false
    }
  },
  methods: {
    onClick() {
      this.open = !this.open
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-nav {
  position: relative;
  > span {
    display: block;
    vertical-align: top;
    padding: 10px 20px;
  }
  &-popover {
    position: absolute;
    top: 100%;
    left: 0;
    white-space: nowrap;
    border: 1px solid black;
  }

  .sub-nav {
    .sub-nav-popover {
      top: 0;
      left: 100%;
    }
  }
}
</style>