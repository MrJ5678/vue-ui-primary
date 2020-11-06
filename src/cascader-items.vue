<template>
  <div class="cascader-item">
    <div class="left">
      <div class="label" v-for="item in items" @click="leftSelected = item">
        {{ item.name }}
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <g-cascader-items :items="rightItems"></g-cascader-items>
    </div>
  </div>
</template>

<script>
export default {
  name: "GCascaderItems",
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      leftSelected: null
    }
  },
  computed: {
    rightItems() {
      if(this.leftSelected && this.leftSelected.children) {
        return this.leftSelected.children
      } else {
        return null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cascader-item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  .left { border: 1px solid red; }
  .right { margin-top: -1px; }
}
</style>