<template>
  <transition name="slide">
    <div v-if="visible" class="sider">
      <slot></slot>
      <button @click="visible = !visible">close</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: "GSider",
  data() {
    return {
      visible: true
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.sider {
  position: relative;
  > button {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.slide-enter-active, .slide-leave-active {
  transition: all .5s;
}
.slide-enter, .slide-leave-to {
  margin-left: -200px;
}
</style>