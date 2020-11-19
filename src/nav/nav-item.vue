<template>
  <div class="nav-item" :class="{ selected }" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GNavItem",
  inject: ['root'],
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
      console.log('click');
      this.$emit('add:selected', this.name)
    }
  }
};
</script>

<style lang="scss" scoped>
@import "var";

.nav-item {
  padding: 10px 20px;
  position: relative;
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

.sub-nav {
  .nav-item {

    &.selected {
      background-color: $grey;
      color: $color;
      &::before {
          display: none;
      }
    }
  }
}
</style>