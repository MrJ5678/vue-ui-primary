<template>
  <button class="g-button" :class="{[`icon-${iconPosition}`]: true}">
    <g-icon class="icon" v-if="icon" :name="icon"></g-icon>
    <g-icon class="loading" name="loading"></g-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>
<script>
import Icon from "./icon";

export default {
  // props: ['icon', 'iconPosition'] // left/right
  props: {
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
  }
}
</script>
<style lang="scss">
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.g-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  height: var(--button-height);
  padding: 0 1em;
  font: inherit;
  font-size: var(--font-size);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: var(--button-bg);

  &:hover {
    border-color: var(--border-color-hover);
  }

  &:active {
    background-color: var(--button-activebg);
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