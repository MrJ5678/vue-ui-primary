<template>
  <div class="nav" :class="{vertical}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GNav",
  provide() {
    return {
      root: this,
      vertical: this.vertical
    }
  },
  props: {
    selected: {
      type: String,
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      namePath: []
    }
  },
  mounted() {
    this.updateChildren()
    this.listenToChildren()
  },
  updated() {
    this.updateChildren()
  },
  // computed: {
  //   items() {
  //     return this.$children.filter(vm => vm.$options.name === 'GNavItem')
  //   }
  // },
  methods: {
    addItem(vm) {
      this.items.push(vm)
    },
    updateChildren() {
      this.items.forEach(vm => {
        if (this.selected === vm.name) {
          vm.selected = true
          // console.log(`true: ${ vm.name }`)
        } else {
          vm.selected = false
        }
      })
    },
    listenToChildren() {
      this.items.forEach(vm => {
        vm.$on('update:selected', (name) => {
          this.$emit('update:selected', name)
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "var";

.nav {
  display: flex;
  color: $color;
  border-bottom: 1px solid $grey;
  cursor: default;
  user-select: none;

  &.vertical {
    flex-direction: column;
    border: 1px solid $grey;
  }
}
</style>