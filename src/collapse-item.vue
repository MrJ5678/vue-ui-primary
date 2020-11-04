<template>
  <div class="collapse-item">
    <div class="title" @click="toggle">
      {{ title }}
    </div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GCollapseItem",
  inject: ['eventBus'],
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      open: false
    }
  },
  mounted() {
    this.eventBus && this.eventBus.$on('update:selected', (vm) => {
      if(vm !== this) {
        this.close()
      }
    })
  },
  methods: {
    toggle() {
      if(this.open) {
        this.open = false
      } else {
        this.open = true
        this.eventBus && this.eventBus.$emit('update:selected', this)
      }
    },
    close() {this.open = false}
  }
}
</script>

<style lang="scss" scoped>
$grey: #ddd;
$border-radius: 4px;
$title-min-height: 32px;

.collapse-item {
  > .title {margin-top: -1px;margin-left: -1px;margin-right: -1px;min-height: $title-min-height;display: flex;align-items: center;padding: 0 8px;border: 1px solid $grey;
  }
  &:first-child {
    > .title {border-top-left-radius: $border-radius;border-top-right-radius: $border-radius;}
  }
  &:last-child {
    > .title:last-child {border-bottom-left-radius: $border-radius;border-bottom-right-radius: $border-radius;}
  }
  > .content {padding: 8px;}
}
</style>