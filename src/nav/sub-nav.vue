<template>
  <div class="sub-nav" :class="{active}" v-click-outside="close">
    <span @click="onClick">
      <slot name="title"></slot>
    </span>
    <div class="sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from '../click-outside'

export default {
  name: "GSubNav",
  inject: ['root'],
  directives: { ClickOutside },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    active() {
      return this.root.namePath.indexOf(this.name) >= 0 ? true : false
    }
  },
  methods: {
    close() {
      this.open = false
    },
    onClick() {
      this.open = !this.open
    },
    updateNamePath() {
      // this.active = true
      this.root.namePath.unshift(this.name)
      if(this.$parent.updateNamePath) {
        this.$parent.updateNamePath()
      } else {

      }
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
      min-width: 7em;
    }
  }
}

.nav {
  .sub-nav {
    &.active {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: calc(100% - 2px);
        border: 1px solid $blue;
      }
    }
  }
}
</style>