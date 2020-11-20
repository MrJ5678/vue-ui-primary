<template>
  <div class="sub-nav" :class="{active, vertical}" v-click-outside="close">
    <span class="sub-nav-label" @click="onClick">
      <slot name="title"></slot>
      <span class="sub-nav-icon" :class="{open, vertical}">
        <g-icon name="right"></g-icon>
      </span>
    </span>
    <template v-if="vertical">
      <transition @enter="enter" @leave="leave" @after-leave="afterLeave" @after-enter="afterEnter">
        <div class="sub-nav-popover" :class="{vertical}" v-show="open">
          <slot></slot>
        </div>
      </transition>
    </template>
    <template v-else>
      <div class="sub-nav-popover" v-show="open">
        <slot></slot>
      </div>
    </template>
  </div>
</template>

<script>
import ClickOutside from '../click-outside'
import Icon from '../icon'

export default {
  name: "GSubNav",
  inject: ['root', 'vertical'],
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
    // beforeEnter(el) {
    //   el.style.height = 0
    // },
    enter(el, done) {
      // el.style.height = 'auto'
      let { height } = el.getBoundingClientRect()
      el.style.height = 0
      el.getBoundingClientRect()
      el.style.height = `${ height }px`
      el.addEventListener('transitionend', () => {
        done()
      })
      // done()
    },
    afterEnter(el) {
      el.style.height = 'auto'
    },
    leave(el, done) {
      let { height } = el.getBoundingClientRect()
      el.style.height = `${ height }px`
      el.getBoundingClientRect()
      el.style.height = 0
      el.addEventListener('transitionend', () => {
        done()
      })
    },
    afterLeave(el) {
      console.log('afterLeave');
      el.style.height = 'auto'
      console.log(el.getBoundingClientRect().height);
    },
    close() {
      this.open = false
    },
    onClick() {
      this.open = !this.open
    },
    updateNamePath() {
      // this.active = true
      this.root.namePath.unshift(this.name)
      if (this.$parent.updateNamePath) {
        this.$parent.updateNamePath()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "var";

.x-enter-active, .x-leave-active {}

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
    &.vertical {
      position: static;
      border-radius: 0;
      border: none;
      box-shadow: none;
      overflow: hidden;
      transition: height .3s;
    }
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
      transition: transform .3s;

      &.vertical {
        transform: rotate(90deg);

        &.open {
          transform: rotate(270deg);
        }
      }

      &:not(.vertical) {
        &.open {
          transform: rotate(180deg);
        }
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

      &:not(.vertical) {
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
}
</style>