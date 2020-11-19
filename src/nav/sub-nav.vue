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
@import "var";

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
    margin-top: 4px;
    min-width: 6em;
    white-space: nowrap;
    background-color: #fff;
    box-shadow: 0 0 3px fade-out(black, .8);
    border-radius: $border-radius;
    font-size: $small-font-size;
    color: $color-light;
    text-align: center;
  }

  .sub-nav {
    .sub-nav-popover {
      top: 0;
      left: 101%;
    }
  }
}
</style>