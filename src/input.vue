<template>
  <div class="wrapper" :class="{'error': error}">
    <input
      type="text"
      :value="value"
      :disabled="disabled"
      :readonly="readonly"
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
    >
    <template v-if="error">
      <icon name="error" class="error-icon"></icon>
      <span class="error-content">{{ error }}</span>
    </template>
  </div>
</template>

<script>
import Icon from './icon.vue'

export default {
  name: "UiInput",
  components: {
    Icon
  },
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
@import "var";

.wrapper {display: inline-flex;justify-content: center;align-items: center;font-size: $font-size;

  :not(:last-child) { margin-right: .5em; }

  > input {height: $input-height;padding: 0 8px;font-size: inherit;border: 1px solid $border-color;border-radius: $border-radius;

    &:hover {border-color: $border-color-hover;}

    &:focus {box-shadow: inset 0 1px 3px $box-shadow-color;outline: none;}

    &[disabled],
    &[readonly] {border-color: #aaa;color: #aaa;cursor: not-allowed;}
  }

  &.error {
    > input {border-color: $red;}

    .error-icon { fill: $red; font-weight: bold; }

    .error-content {color: $red;}
  }
}
</style>