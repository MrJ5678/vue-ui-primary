<template>
  <div class="cascader" v-click-outside="close">
    <div class="trigger" @click="toggle">
      {{ result || '&nbsp;' }}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items :items="source" class="popover" :height="popoverHeight" :selected="selected" @update:selected="onUpdateSelected" :load-data="loadData" :loading-item="loadingItem"></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from './cascader-items'
import ClickOutside  from '../click-outside'

export default {
  name: "GCascader",
  directives: { ClickOutside },
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
    },
    loadData: {
      type: Function
    }
  },
  data() {
    return {
      popoverVisible: false,
      loadingItem: {},
    }
  },
  computed: {
    result() {
      return this.selected && this.selected.map(item => item.name).join('/')
    }
  },
  methods: {
    close() {
      console.log('close')
      this.popoverVisible = false
    },
    open() {
      this.popoverVisible = true
    },
    toggle() {
      if(this.popoverVisible) {
        this.close()
      } else {
        this.open()
      }
    },
    onUpdateSelected(newSelected) {
      this.$emit('update:selected', newSelected)
      let clickedNode = newSelected[newSelected.length - 1]

      let simplest = (children, id) => {
        return children.filter(item => item.id === id)[0]
      }

      let complex = (children, id) => {
        let noChildren = []
        let hasChildren = []
        children.forEach(item => {
          if(item.children) {
            hasChildren.push(item)
          } else {
            noChildren.push(item)
          }
        })

        let found = simplest(noChildren, id)
        if(found) {
          return found
        } else {
          let found = simplest(hasChildren, id)
          if(found) { return found }
          else {
            for (let i = 0; i < hasChildren.length; i++) {
              found = complex(hasChildren[i].children, id)
              if(found) { return found }
            }
            return undefined
          }
        }
      }


      let updateSource = (result) => {
      //   console.log(JSON.stringify(this.source))
      //   console.log(clickedNode.id)
        this.loadingItem = {}
        let copy = JSON.parse(JSON.stringify(this.source))
        let toUpdate = complex(copy, clickedNode.id)
        toUpdate.children = result
        this.$emit('update:source', copy)
      }
      if (!clickedNode.isLeaf && this.loadData) {
        this.loadData(clickedNode, updateSource) // 回调 调用组件使用者传给组件的函数
        this.loadingItem = clickedNode
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "var";

.cascader {
  display: inline-block;
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
    z-index: 1;
    @extend .box-shadow;
    .label {
      white-space: nowrap;
    }
  }
}
</style>