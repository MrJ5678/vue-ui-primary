<template>
  <div>
    <g-slides class="wrapper" :selected.sync="selected">
      <g-slides-item name="1">
        <div class="box">1</div>
      </g-slides-item>
      <g-slides-item name="2">
        <div class="box">2</div>
      </g-slides-item>
      <g-slides-item name="3">
        <div class="box">3</div>
      </g-slides-item>
    </g-slides>
  </div>
</template>

<script>
import Slides from './slides'
import SlidesItem from './slides-item'

export default {
  name: "Demo",
  components: {
    'g-slides': Slides,
    'g-slides-item': SlidesItem
  },
  data() {
    return {
      selected: undefined
    }
  },
  created() {
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

.wrapper {
  display: block;
  margin: 40px;
}

.box {
  width: 100%;
  height: 150px;
  background-color: #ddd;
  border: 1px solid red;
}
</style>