<template>
  <div class="cascader-item" :style="{height: height}">
    <div class="left">
      <div class="label" v-for="item in items" @click="onClickLabel(item)">
        <span class="name">{{ item.name }}</span>
        <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <g-icon class="loading" name="loading"></g-icon>
          </template>
          <template v-else>
            <g-icon class="next" v-if="rightArrowVisible(item)" name="right"></g-icon>
          </template>
        </span>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <g-cascader-items :items="rightItems" :height="height" :level="level + 1" :selected="selected" @update:selected="onUpdateSelected" :load-data="loadData" :loading-item="loadingItem"></g-cascader-items>
    </div>
  </div>
</template>

<script>
import Icon from '../icon'

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
    },
    loadData: {
      type: Function
    },
    loadingItem: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    rightItems() {
      if(this.selected[this.level]) {
        let item = this.items.filter(item => item.name === this.selected[this.level].name)[0]
        if(item && item.children && item.children.length > 0) {
          return item.children
        }
      }
    }
  },
  methods: {
    rightArrowVisible(item) {
      return this.loadData ? !item.isLeaf : item.children
    },
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
@import "src/var";
.cascader-item {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  //height: 100px;
  .left { height: 100%;padding: .3em 0; overflow: auto; }

  .right { height: 100%; border-left: 1px solid $border-color-light; }
  .label { padding: .5em 1em;display: flex;align-items: center;white-space: nowrap;
    &:hover { background-color: $grey; user-select: none; cursor: pointer; }
    > .name { margin-right: 1em; }
    .icons {display: flex;align-items: center; margin-left: auto;}
    .next { transform: scale(.7); }
    .loading {animation: spin 2s infinite linear;}
  }
}

</style>