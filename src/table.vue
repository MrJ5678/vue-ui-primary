<template>
  <div ref="wrapper" class="g-table-wrapper">
    <div :style="{height, overflow: 'auto'}">
      <table ref="table" class="g-table" :class="{bordered, compact, striped: striped}">
        <thead>
          <tr>
            <th>
              <input ref="allChecked" type="checkbox" @change="onChangeAllItems" :checked="areAllItemsSelected">
            </th>
            <th v-if="numberVisible">#</th>
            <th v-for="column in columns" :key="column.field">
              <div class="g-table-header">
                {{ column.text }}
                <span v-if="column.field in orderBy" class="g-table-sorter" @click="changeOrderBy(column.field)">
                  <g-icon name="asc" :class="{active: orderBy[column['field']] === 'asc'}"></g-icon>
                  <g-icon name="desc" :class="{active: orderBy[column['field']] === 'desc'}"></g-icon>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataSource" :key="item.id">
            <td>
              <input type="checkbox" @change="onChangeItem(item, index, $event)" :checked="inSelectedItems(item)">
            </td>
            <td v-if="numberVisible">{{ index + 1 }}</td>
            <template v-for="column in columns">
              <td :key="column.field">{{ item[column.field] }}</td>
            </template>
          </tr>
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
  name: "GTable",
  components: {
    'g-icon': Icon
  },
  props: {
    height: {
      type: [Number ,String]
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
        return array.filter(item => item.id === undefined).length <= 0;
      }
    },
    numberVisible: {
      type: Boolean,
      default: false
    },
    bordered: {
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
    }
  },
  watch: {
    selectedItems() {
      if(this.selectedItems.length === this.dataSource.length) {
        this.$refs.allChecked.indeterminate = false
      }else if(this.selectedItems.length === 0) {
        this.$refs.allChecked.indeterminate = false
      } else {
        this.$refs.allChecked.indeterminate = true
      }
    }
  },
  mounted() {
    let table2 = this.$refs.table.cloneNode(true)
    this.table2 = table2
    table2.classList.add('g-table-copy')
    this.updateHeadersWidth()
    this.$refs.wrapper.appendChild(table2)
    console.log(this.$refs.wrapper);
    this.onWindowResize = () => this.updateHeadersWidth()
    window.addEventListener('resize', this.onWindowResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize)
    this.table2.remove()
  },
  methods: {
    updateHeadersWidth() {
      let tableHead = Array.from(this.$refs.table.children).filter(node => node.tagName.toLowerCase() === 'thead')[0]
      let tableHead2
      let table2 = this.table2
      Array.from(table2.children).map(node => {
        if(node.tagName.toLowerCase() !== 'thead') {
          node.remove()
        }else {
          tableHead2 = node
        }
      })
      // console.log(table2);
      Array.from(tableHead.children[0].children).map((th, i) => {
        const {width} = th.getBoundingClientRect()
        tableHead2.children[0].children[i].style.width = width + 'px'
      })
    },
    changeOrderBy(key) {
      const copy = JSON.parse(JSON.stringify(this.orderBy))
      let oldValue = copy[key]
      if(oldValue ==='asc') {
        copy[key] = 'desc'
      }else if(oldValue === 'desc') {
        copy[key] = true
      } else {
        copy[key] = 'asc'
      }
      this.$emit('update:orderBy', copy)
    },
    onChangeItem(item, index, e) {
      let selected = e.target.checked
      let copy = JSON.parse(JSON.stringify(this.selectedItems))
      if(selected) {
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
};
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
}
</style>