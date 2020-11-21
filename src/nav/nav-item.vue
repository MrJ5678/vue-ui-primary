<template>
  <div class="nav-item" :class="{ selected, vertical }" @click="onClick" :data-name="name">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GNavItem",
  inject: ['root', 'vertical'],
  props: {
    name: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      selected: false
    }
  },
  created() {
    this.root.addItem(this)
  },
  methods: {
    onClick() {
      this.root.namePath = []
      this.$parent.updateNamePath && this.$parent.updateNamePath()
      this.$emit('update:selected', this.name)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "var";

.nav-item {
  padding: 10px 20px;
  position: relative;

  &:not(.vertical) {
    &.selected {
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

  &.vertical {
    &.selected {
      color: $blue;
    }
  }
}

a {
  color: inherit;
  text-decoration: none;
}

.sub-nav {
  .nav-item {
    &:not(.vertical) {
      &.selected {
        background-color: $grey;
        color: $color;

        &::before {
          display: none;
        }
      }
    }
  }
}
</style>