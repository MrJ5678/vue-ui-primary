<template>
  <div style="padding: 100px;">
    <g-popover>
      <template slot="content">弹出内容</template>
      <button>按钮</button>
    </g-popover>
  </div>
</template>

<script>
import Popover from './popover'
// import Cascader from './cascader'
// import db from './db'
// import { removeListener } from "@/click-outside";

// function ajax(parentId = 0, success, fail) {
//   let timerId = setTimeout(() => {
//     let result = db.filter(item => item.parent_id === parentId)
//     success(result)
//   }, 3000)
//   return timerId
// }

// function ajax(parentId = 0) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       let result = db.filter(item => item.parent_id === parentId)
//       result.forEach(node => {
//         if(db.filter(item => item.parent_id === node.id).length > 0) {
//           node.isLeaf = false
//         } else {
//           node.isLeaf = true
//         }
//       })
//       resolve(result)
//     }, 300)
//   })
// }

export default {
  name: "Demo",
  components: {
    'g-popover': Popover
  },
  // data() {
  //   return {
  //     source: [],
  //     selected: []
  //   }
  // },
  // created() {
  //   ajax(0).then(result => {
  //     this.source = result
  //   })
  // },
  // methods: {
  //   loadData(clickedNode, updateSource) {
  //     // console.log(node)
  //     let { id } = clickedNode
  //     ajax(id).then(result => {
  //       updateSource(result)
  //     })
  //   },
  //   xxx() {
  //     // console.log(this.selected)
  //     ajax(this.selected[0].id).then(result => {
  //       let lastLevelSelected = this.source.filter(item => this.selected[0].id === item.id)[0]
  //       this.$set(lastLevelSelected, 'children', result)
  //       console.log(lastLevelSelected)
  //     })
  //   }
  // }
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