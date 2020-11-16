<template>
  <transition name="slide">
    <div class="slides-item" v-if="visible" :class="{reverse}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: "GSlideItem",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selected: undefined,
      reverse: false
    }
  },
  computed: {
    visible() {
      return this.selected === this.name
    }
  }
};
</script>

<style lang="scss" scoped>
.slides-item {

}

.slide-leave-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s;
}

.slide-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-enter.reverse {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-leave-to.reverse {
  opacity: 0;
  transform: translateX(100%);
}
</style>