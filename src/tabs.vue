<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'


export default {
  name: "GTabs",
  props: {
    selected: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) >= 0
      }
    }
  },
  data() {
    return {
      eventBus: new Vue()
    }
  },
  provide() {
    return {
      eventBus: this.eventBus
    }
  },
  mounted() {
    if(this.$children.length === 0) {
      console && console.warn && console.warn('tabs 没有子组件，应该且只能是 tabs-head 和 tabs-body 组件')
    }
    // this.$nextTick(() => {
    //   this.eventBus.$emit('update:selected', 'this eventBus $emit 出来的数据')
    // })
    this.$children.forEach((vm) => {
      if(vm.$options.name === 'GTabsHead') {
        vm.$children.forEach((childVm) => {
          if(childVm.$options.name === 'GTabsItem' && childVm.name === this.selected) {
            // console.log(childVm.$el)
            this.eventBus.$emit('update:selected', this.selected, childVm)
          }
        })
      }
    })
  }
}
</script>

<style scoped>
.tabs {}
</style>