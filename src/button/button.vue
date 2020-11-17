<template>
  <button class="g-button" :class="{[`icon-${iconPosition}`]: true}" @click="$emit('click')">
    <g-icon class="icon" v-if="icon && !loading" :name="icon"></g-icon>
    <g-icon class="loading icon" v-if="loading" name="loading"></g-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>
<script>
import Icon from '../icon'

export default {
  name: 'UiButton',
  components: {
    'g-icon': Icon
  },
  // props: ['icon', 'iconPosition'] // left/right
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator(value) {
        return !(value !== 'left' && value !== 'right');
      }
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@import "var";

.g-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  height: $button-height;
  padding: 0 1em;
  font: inherit;
  font-size: $font-size;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  background-color: $button-bg;

  &:hover {
    border-color: $border-color-hover;
  }

  &:active {
    background-color: $button-active-bg;
  }

  &:focus {
    outline: none;
  }

  > .icon {
    order: 1;
    margin-right: .3em;
  }

  > .content {
    order: 2;
  }

  &.icon-right {
    > .icon {
      order: 2;
      margin-right: 0;
      margin-left: .3em;
    }

    > .content {
      order: 1;
    }
  }

  .loading {
    animation: spin 2s infinite linear;
  }
}
</style>