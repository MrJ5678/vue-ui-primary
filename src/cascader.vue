<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items :items="source" class="popover" :height="popoverHeight"></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from './cascader-items'

export default {
  name: "GCascader",
  components: { CascaderItems },
  props: {
    source: {
      type: Array
    },
    popoverHeight: {
      type: String
    }
  },
  data() {
    return {
      popoverVisible: false,
    }
  }, }
</script>

<style lang="scss" scoped>
@import "var";

.cascader {
  position: relative;
  .trigger {
    height: 32px;
    width: 100px;
    border: 1px solid #000;
  }

  .popover-wrapper {
    position: absolute;top: 100%;left: 0;display: flex;
    /*height: 200px;//border: 2px solid green;*/background-color: #fff;
    @extend .box-shadow;
    .label {
      white-space: nowrap;
    }
  }
}
</style>