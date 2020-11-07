<template>
  <div>
    <g-cascader :source="source" popover-height="200px"></g-cascader>
    <p>111</p>
  </div>
</template>

<script>
import Cascader from './cascader'

export default {
  name: "Demo",
  components: {
    'g-cascader': Cascader
  },
  data() {
    return {
      source: [
        {
          name: '浙江',
          children: [
            {
              name: '杭州',
              children: [
                { name: '上城区' },
                { name: '下城区' },
                { name: '上城区' },
              ]
            },
            {
              name: '嘉兴',
              children: [
                { name: '秀城区' },
                { name: '秀洲区' },
                { name: '南湖区' },
              ]
            },
            {
              name: '湖州',
              children: [
                { name: '吴兴区' },
                { name: '南浔区' }
              ]
            },
          ]
        },
        {
          name: '福建',
          children: [
            {
              name: '福州',
              children: [
                { name: '鼓楼区' },
                { name: '台江区' },
                { name: '仓山区' },
              ]
            },
            {
              name: '泉州',
              children: [
                { name: '丰泽区' },
                { name: '洛江区' },
                { name: '泉港区' },
              ]
            },
            {
              name: '厦门',
              children: [
                { name: '思明区' },
                { name: '湖里区' },
                { name: '集美区' },
              ]
            },
          ]
        }

      ]
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