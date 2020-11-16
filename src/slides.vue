<template>
  <div class="slides" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="slides-window" ref="window">
      <div class="slides-wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="slides-dots">
      <span v-for="n in childrenLength" :class="{active: selectedIndex === n - 1}" @click="select(n-1)">
        {{ n-1 }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GSlides",
  props: {
    selected: {
      type: String
    },
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      childrenLength: 0,
      lastSelectedIndex: undefined,
      timerId: undefined
    }
  },
  computed: {
    names() {
       return this.$children.map(vm => vm.name)
    },
    selectedIndex() {
      return !this.selected ? 0 : this.names.indexOf(this.selected);
    }
  },
  mounted() {
    this.updateChildren()
    this.playAutomatically()
    this.childrenLength = this.$children.length
  },
  updated() {
    this.updateChildren()
  },
  methods: {
    onMouseEnter() {
      this.pause()
    },
    onMouseLeave() {
      this.playAutomatically()
    },
    playAutomatically() {
      if(this.timerId) { return }
      // setInterval(() => {
      //   if(index === names.length - 1) { index = -1 } // name.length 值为3
      //   this.$emit('update:selected', names[index + 1])
      //   index++
      // }, 3000)
      let run = () => {
        let index = this.names.indexOf(this.getSelected())
        // console.log(index)
        let newIndex = index - 1
        if(newIndex === this.names.length) { newIndex = 0 } // name.length 值为3
        if(newIndex === -1) { newIndex = this.names.length - 1}
        this.select(newIndex)
        this.timerId = setTimeout(run, 3000)
      }
      this.timerId = setTimeout(run, 3000)
    },
    pause() {
      window.clearTimeout(this.timerId)
      this.timerId = undefined
    },
    getSelected() {
      let first = this.$children[0]
      return this.selected || first.name
    },
    updateChildren() {
      let selected = this.getSelected()
      let reverse = this.selectedIndex <= this.lastSelectedIndex
      this.$children.forEach(vm => {
        if(this.lastSelectedIndex === this.$children.length - 1 && this.selectedIndex === 0) {
          reverse = false
        }
        if(this.lastSelectedIndex === 0 && this.selectedIndex === this.$children.length - 1) {
          reverse = true
        }
        vm.reverse = reverse
        this.$nextTick(() => {
          vm.selected = selected
        })
      })
    },
    select(index) {
      this.lastSelectedIndex = this.selectedIndex
      this.$emit('update:selected', this.names[index])
    }
  }
};
</script>

<style lang="scss" scoped>
.slides {
  //display: inline-block;
  .slides-window {
    overflow: hidden;
    .slides-wrapper {
      position: relative;
    }
  }
  .slides-dots {
    > span {
      &.active {
        background-color: red;
      }
    }
  }
}
</style>