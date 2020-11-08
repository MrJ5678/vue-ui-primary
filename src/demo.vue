<template>
  <div>
    <div>{{ selected }}</div>
    <div style="padding: 20px;">
      <g-cascader :source="source" popover-height="200px" :selected.sync="selected"></g-cascader>
    </div>
  </div>
</template>

<script>
import Cascader from './cascader'
import db from './db'

function ajax(parentId = 0) {
  return db.filter(item => item.parent_id === parentId)
}

console.log(ajax())

export default {
  name: "Demo",
  components: {
    'g-cascader': Cascader
  },
  data() {
    return {
      source: ajax(),
      selected: []
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