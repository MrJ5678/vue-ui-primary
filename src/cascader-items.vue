<template>
  <div class="cascader-item" :style="{height: height}">
    <div class="left">
      <div class="label" v-for="item in items" @click="leftSelected = item">
        {{ item.name }}
        <g-icon class="icon" v-if="item.children" name="right"></g-icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <g-cascader-items :items="rightItems" :height="height"></g-cascader-items>
    </div>
  </div>
</template>

<script>
export default {
  name: "GCascaderItems",
  props: {
    items: {
      type: Array
    },
    height: {
      type: String
    }
  },
  data() {
    return {
      leftSelected: null
    }
  },
  computed: {
    rightItems() {
      return this.leftSelected && this.leftSelected.children ? this.leftSelected.children : null;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "var";
.cascader-item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  //height: 100px;
  .left { height: 100%;padding: .3em 0; }

  .right { height: 100%; border-left: 1px solid $border-color-light; }
  .label { padding: .3em 1em;display: flex;align-items: center; justify-content: space-between;
    .icon { margin-left: 1em; transform: scale(.7)}
  }
}
</style>