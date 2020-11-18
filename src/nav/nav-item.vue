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
.nav-item {
  padding: 10px 20px;
  &.selected {
    background-color: red;
  }
}
</style>