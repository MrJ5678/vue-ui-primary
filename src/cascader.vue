<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
    </div>
    <div class="popover" v-if="popoverVisible">
      <cascader-items :items="source"></cascader-items>
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
  .trigger {
    height: 32px;
    width: 100px;
    border: 1px solid red;
  }

  .popover {
    display: flex;
    height: 200px;
    border: 2px solid green;

    .label {
      white-space: nowrap;
    }
  }


}
</style>