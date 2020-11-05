<template>
  <div class="cascader-item">
    {{ sourceItem.name }}
    <g-cascader-item
      v-if="sourceItem.children"
      v-for="item in sourceItem.children"
      :source-item="item"
    >
    </g-cascader-item>
  </div>
</template>

<script>
export default {
  name: "GCascaderItem",
  props: {
    sourceItem: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.cascader-item {
  border: 1px solid red;
  margin: 10px;
}
</style>