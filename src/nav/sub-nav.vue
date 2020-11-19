<template>
  <div class="sub-nav" :class="{active}" v-click-outside="close">
    <span class="sub-nav-label" @click="onClick">
      <slot name="title"></slot>
      <span class="sub-nav-icon" :class="{open}">
        <g-icon name="right"></g-icon>
      </span>
    </span>
    <div class="sub-nav-popover" v-show="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from '../click-outside'
import Icon from '../icon'

export default {
  name: "GSubNav",
  inject: ['root'],
  directives: { ClickOutside },
  components: {
    'g-icon': Icon
  },
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
    active: function() {
      return this.root.namePath.indexOf(this.name) >= 0
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
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "var";

.sub-nav {
  position: relative;

  > .sub-nav-label {
    display: inline-flex;
    vertical-align: top;
    padding: 10px 20px;
    .sub-nav-icon {
      display: none;
    }
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
    //text-align: center;
  }

  .sub-nav {
    .sub-nav-popover {
      top: 0;
      left: 101%;
      min-width: 6em;
    }
    .sub-nav-label {
      display: flex;
      padding: 10px 10px 10px 20px;
      justify-content: space-between;
      align-items: center;
    }
    .sub-nav-icon {
      display: inline-flex;
      margin-left: 1em;
      align-items: center;
      transition: transform .3s ;
      &.open {
        transform: rotate(180deg);
      }
      svg {
        fill: $color-light;
      }
    }
  }
}

.nav {
  > .sub-nav {
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