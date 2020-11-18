<template>
  <div>
    <g-nav :selected.sync="selected">
      <g-nav-item name="home">首页</g-nav-item>
      <g-sub-nav>
        <template slot="title">关于</template>
        <g-nav-item name="culture">企业文化</g-nav-item>
        <g-nav-item name="developers">开发团队</g-nav-item>
        <g-sub-nav>
          <template slot="title">联系电话</template>
          <g-nav-item name="wechat">微信</g-nav-item>
          <g-nav-item name="qq">qq</g-nav-item>
          <g-sub-nav>
            <template slot="title">手机</template>
            <g-nav-item name="yidong">移动</g-nav-item>
            <g-nav-item name="liantong">联通</g-nav-item>
            <g-nav-item name="dianxin">电信</g-nav-item>
          </g-sub-nav>
        </g-sub-nav>
      </g-sub-nav>
      <g-nav-item name="hire">招聘</g-nav-item>
    </g-nav>
  </div>
</template>

<script>
import Nav from './nav/nav'
import NavItem from './nav/nav-item'
import SubNav from './nav/sub-nav'

export default {
  name: "Demo",
  components: {
    'g-nav': Nav,
    'g-nav-item': NavItem,
    'g-sub-nav': SubNav
  },
  data() {
    return {
      selected: ['culture']
    }
  },
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