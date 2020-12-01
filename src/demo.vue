<template>
  <div>
    {{ selected }}
    <div style="margin: 20px;">
      <g-table
          :columns="columns"
          :data-source="dataSource"
          bordered
          striped
          :selected-items.sync="selected"
          :order-by.sync="orderBy"
          @update:orderBy="x"
          :loading="loading"
          :height="400"
          expend-field="description"
          checkable
      >
        <template slot-scope="xxx">
          <button @click="edit(xxx.item)">编辑</button>
          <button @click="view(xxx.item)">查看</button>
        </template>
      </g-table>
    </div>

    <!--    <div style="margin: 20px;">-->
    <!--      <g-table :columns="columns" :data-source="dataSource" bordered compact :striped="false"></g-table>-->
    <!--    </div>-->
  </div>
</template>

<script>
import Table from './table'

export default {
  name: "Demo",
  components: {
    'g-table': Table
  },
  data() {
    return {
      selected: [],
      columns: [
        { text: '姓名', field: 'name', width: 100 },
        { text: '分数', field: 'score', width: 200 },
      ],
      orderBy: {
        name: 'asc',
        score: 'desc'
      },
      dataSource: [
        { id: 1, name: '张三', score: 100, description: 'xxx xxxx' },
        { id: 2, name: '李四', score: 99, description: 'xxx xxxxxxx' },
        { id: 3, name: '王五', score: 98 },
        { id: 4, name: '周六', score: 97 },
        { id: 5, name: '吴七', score: 96 },
        { id: 6, name: '郑八', score: 95 },
        { id: 7, name: '张三', score: 94 },
        { id: 8, name: '李四', score: 93 },
        { id: 9, name: '王五', score: 92 },
        { id: 10, name: '周六', score: 91 },
        { id: 11, name: '吴七', score: 90 },
        { id: 12, name: '郑八', score: 89 },
      ],
      loading: false
    }
  },
  methods: {
    x() {
      this.loading = true
      setTimeout(() => {
        this.dataSource = this.dataSource.sort((a, b) => a.score - b.score)
        this.loading = false
      }, 3000)
    },
    edit(item) {
      alert(`开始编辑${item.id}`)
    },
    view(item) {
      alert(`开始查看${item.id}`)
    }
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  --font-size: 14px;
}

body {
  font-size: var(--font-size);
}

</style>