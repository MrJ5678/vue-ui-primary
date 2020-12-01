<template>
  <div ref="wrapper" class="g-table-wrapper">
    <div :style="{height, overflow: 'auto'}" ref="tableWrapper">
      <table ref="table" class="g-table" :class="{bordered, compact, striped: striped}">
        <thead>
        <tr>
          <th v-if="expendField" :style="{width: '50px'}" class="g-table-center"></th>
          <th v-if="checkable" :style="{width: '50px'}" class="g-table-center">
            <input ref="allChecked" type="checkbox" @change="onChangeAllItems" :checked="areAllItemsSelected">
          </th>
          <th :style="{width: '50px'}" v-if="numberVisible">#</th>
          <th :style="{width: column.width + 'px'}" v-for="column in columns" :key="column.field">
            <div class="g-table-header">
              {{ column.text }}
              <span v-if="column.field in orderBy" class="g-table-sorter" @click="changeOrderBy(column.field)">
                <g-icon name="asc" :class="{active: orderBy[column['field']] === 'asc'}"></g-icon>
                <g-icon name="desc" :class="{active: orderBy[column['field']] === 'desc'}"></g-icon>
              </span>
            </div>
          </th>
          <th ref="actionsHeader" v-if="$scopedSlots.default">操作</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="(item, index) in dataSource">
          <tr :key="item.id">
            <td v-if="expendField" :style="{width: '50px'}" class="g-table-center">
              <g-icon class="g-table-expendIcon" name="right" @click="expendItem(item.id)"></g-icon>
            </td>
            <td v-if="checkable" :style="{width: '50px'}" class="g-table-center">
              <input type="checkbox" @change="onChangeItem(item, index, $event)" :checked="inSelectedItems(item)">
            </td>
            <td :style="{width: '50px'}" v-if="numberVisible">{{ index + 1 }}</td>
            <template v-for="column in columns">
              <td :style="{width: column.width + 'px'}" :key="column.field">{{ item[column.field] }}</td>
            </template>
            <td v-if="$scopedSlots.default">
              <div ref="actions" style="display: inline-block">
                <slot :item="item"></slot>
              </div>
            </td>
          </tr>
          <tr v-if="inExpendedIds(item.id)" :key="`${item.id}-expend`">
            <td :colspan="columns.length + expendedCellColSpan">
              {{ item[expendField] || '空' }}
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="g-table-loading">
      <g-icon name="loading"></g-icon>
    </div>
  </div>
</template>

<script>
import Icon from './icon'

export default {
  name: 'GTable',
  components: {
    'g-icon': Icon
  },
  data() {
    return {
      expendedIds: []
    }
  },
  props: {
    expendField: {
      type: String
    },
    height: {
      type: Number
    },
    loading: {
      type: Boolean,
      default: false
    },
    orderBy: {
      type: Object,
      default: () => ({}),
    },
    striped: {
      type: Boolean,
      default: true
    },
    selectedItems: {
      type: Array,
      default: () => []
    },
    compact: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    },
    dataSource: {
      type: Array,
      required: true,
      validator(array) {
        return array.filter(item => item.id === undefined).length <= 0
      }
    },
    numberVisible: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    areAllItemsSelected() {
      let a = this.dataSource.map(item => item.id).sort()
      let b = this.selectedItems.map(item => item.id).sort()
      if (a.length !== b.length) {
        return false
      }
      let equal = true
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          equal = false
          break
        }
      }
      return equal
      // this.dataSource.sort((a, b) => a.id - b.id)
    },
    expendedCellColSpan() {
      let result = 0
      if (this.checkable) {result += 1}
      if (this.expendField) {result += 1}
      return result
    }
  },
  watch: {
    selectedItems() {
      if (this.selectedItems.length === this.dataSource.length) {
        this.$refs.allChecked.indeterminate = false
      } else if (this.selectedItems.length === 0) {
        this.$refs.allChecked.indeterminate = false
      } else {
        this.$refs.allChecked.indeterminate = true
      }
    }
  },
  mounted() {
    let table2 = this.$refs.table.cloneNode(false)
    this.table2 = table2
    table2.classList.add('g-table-copy')
    let tHead = this.$refs.table.children[0]
    let {height} = tHead.getBoundingClientRect()
    this.$refs.tableWrapper.style.marginTop = height + 'px'
    this.$refs.tableWrapper.style.height = this.height - height + 'px'
    table2.appendChild(tHead)
    this.$refs.wrapper.appendChild(table2)
    // console.log(this.$refs.wrapper);

    if(this.$scopedSlots.default) {
      let div = this.$refs.actions[0]
      let {width} = this.$refs.actions[0].getBoundingClientRect()
      let parent = div.parentNode
      let styles = getComputedStyle(parent)
      let paddingLeft = styles.getPropertyValue('padding-left')
      let paddingRight = styles.getPropertyValue('padding-right')
      let borderLeft = styles.getPropertyValue('border-left-width')
      let borderRight = styles.getPropertyValue('border-right-width')
      console.log(paddingLeft, paddingRight, borderLeft, borderRight)
      let width2 = width + parseInt(paddingLeft) + parseInt(paddingRight) + parseInt(borderLeft) + parseInt(borderRight) + 'px'
      this.$refs.actionsHeader.style.width = width2
      this.$refs.actions.map(div => {
        div.parentNode.style.width = width2
      })
    }
  },
  beforeDestroy() {
    this.table2.remove()
  },
  methods: {
    inExpendedIds(id) {
      return this.expendedIds.indexOf(id) >= 0
    },
    expendItem(id) {
      if (this.inExpendedIds(id)) {
        this.expendedIds.splice(this.expendedIds.indexOf(id), 1)
      } else {
        this.expendedIds.push(id)
      }
    },
    // updateHeadersWidth() {
    //   let tableHead = Array.from(this.$refs.table.children).filter(node => node.tagName.toLowerCase() === 'thead')[0]
    //   let tableHead2
    //   let table2 = this.table2
    //   Array.from(table2.children).map(node => {
    //     if(node.tagName.toLowerCase() !== 'thead') {
    //       node.remove()
    //     }else {
    //       tableHead2 = node
    //     }
    //   })
    //   // console.log(table2);
    //   Array.from(tableHead.children[0].children).map((th, i) => {
    //     const {width} = th.getBoundingClientRect()
    //     tableHead2.children[0].children[i].style.width = width + 'px'
    //   })
    // },
    changeOrderBy(key) {
      const copy = JSON.parse(JSON.stringify(this.orderBy))
      let oldValue = copy[key]
      if (oldValue === 'asc') {
        copy[key] = 'desc'
      } else if (oldValue === 'desc') {
        copy[key] = true
      } else {
        copy[key] = 'asc'
      }
      this.$emit('update:orderBy', copy)
    },
    onChangeItem(item, index, e) {
      let selected = e.target.checked
      let copy = JSON.parse(JSON.stringify(this.selectedItems))
      if (selected) {
        copy.push(item)
      } else {
        copy = copy.filter(i => i.id !== item.id)
      }
      this.$emit('update:selectedItems', copy)
    },
    onChangeAllItems(e) {
      let selected = e.target.checked
      this.$emit('update:selectedItems', selected ? this.dataSource : [])
    },
    inSelectedItems(item) {
      return this.selectedItems.filter(i => i.id === item.id).length > 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import "var";

$grey: darken($grey, 10%);
.g-table-wrapper {
  position: relative;
  overflow: auto;

  .g-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $grey;

    &.bordered {
      border: 1px solid $grey;

      td, th {
        border: 1px solid $grey;
      }
    }

    &.compact {
      td, th {
        padding: 4px;
      }
    }

    td, th {
      padding: 8px;
      border-bottom: 1px solid $grey;
      text-align: left;
    }

    &.striped {
      tbody {
        > tr {
          &:nth-child(odd) {
            background-color: #fff;
          }

          &:nth-child(even) {
            background-color: lighten($grey, 10%);
          }
        }
      }
    }

    .g-table-sorter {
      display: inline-flex;
      flex-direction: column;
      margin: 0 4px;
      cursor: pointer;

      svg {
        width: 10px;
        height: 10px;
        fill: $grey;

        &:first-child {
          position: relative;
          bottom: -1px;
        }

        &:last-child {
          position: relative;
          top: -1px;
        }

        &.active {
          fill: red;
        }
      }
    }

    .g-table-header {
      display: flex;
      align-items: center;
    }

    .g-table-center {
      text-align: center;
    }
  }

  .g-table-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .8);

    svg {
      width: 100px;
      height: 100px;
      @include spin;
    }
  }

  .g-table-copy {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
  }

  .g-table-expendIcon {
    width: 10px;
    height: 10px;
  }

}
</style>