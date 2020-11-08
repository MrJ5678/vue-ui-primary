<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
      {{ result || '&nbsp;' }}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items :items="source" class="popover" :height="popoverHeight" :selected="selected" @update:selected="onUpdateSelected"></cascader-items>
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
    },
    selected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      popoverVisible: false,
    }
  },
  computed: {
    result() {
      return this.selected && this.selected.map(item => item.name).join('/')
    }
  },
  methods: {
    onUpdateSelected(newSeleted) {
      this.$emit('update:selected', newSeleted)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "var";

.cascader {
  position: relative;
  height: $input-height;
  .trigger {
    display: inline-flex;
    align-items: center;
    min-width: 10em;
    height: $input-height;
    padding: 0 1em;
    border: 1px solid $border-color;
    border-radius: $border-radius;
  }

  .popover-wrapper {
    position: absolute;top: 100%;left: 0;margin-top: 8px; display: flex;
    /*height: 200px;//border: 2px solid green;*/background-color: #fff;
    @extend .box-shadow;
    .label {
      white-space: nowrap;
    }
  }
}
</style>