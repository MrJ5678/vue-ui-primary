<template>
  <div class="cascader-item" :style="{height: height}">
    <div class="left">
      <div class="label" v-for="item in items" @click="onClickLabel(item)">
        {{ item.name }}
        <g-icon class="icon" v-if="item.children" name="right"></g-icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <g-cascader-items :items="rightItems" :height="height" :level="level + 1" :selected="selected" @update:selected="onUpdateSelected"></g-cascader-items>
    </div>
  </div>
</template>

<script>
import Icon from './icon'

export default {
  name: "GCascaderItems",
  components: {
    'g-icon': Icon
  },
  props: {
    items: {
      type: Array
    },
    height: {
      type: String
    },
    selected: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 0
    }
  },
  computed: {
    rightItems() {
      let currentSelected = this.selected[this.level]
      if(currentSelected && currentSelected.children) {
        return currentSelected.children
      }
    }
  },
  methods: {
    onClickLabel(item) {
      let copy = JSON.parse(JSON.stringify(this.selected))
      copy[this.level] = item
      copy.splice(this.level + 1)
      this.$emit('update:selected', copy)
    },
    onUpdateSelected(newSelected) {
      this.$emit('update:selected', newSelected)
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
  .left { height: 100%;padding: .3em 0; overflow: auto; }

  .right { height: 100%; border-left: 1px solid $border-color-light; }
  .label { padding: .3em 1em;display: flex;align-items: center; justify-content: space-between;
    .icon { margin-left: 1em; transform: scale(.7)}
  }
}
</style>