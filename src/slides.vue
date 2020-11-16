<template>
  <div class="slides"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="slides-window" ref="window">
      <div class="slides-wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="slides-dots">
      <span v-for="n in childrenLength" :class="{active: selectedIndex === n - 1}" @click="select(n-1)">
        {{ n }}
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
      timerId: undefined,
      startTouch: undefined
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
    onTouchStart(e) {
      this.pause()
      console.log('摸')
      if(e.touches.length > 1) { return true}
      // console.log(e.touches[0])
      this.startTouch = e.touches[0]
    },
    onTouchMove() {
      console.log('边摸边动')
    },
    onTouchEnd(e) {
      // console.log(e.changedTouches[0]);
      let endTouch = e.changedTouches[0]
      let { clientX: x1, clientY: y1 } = this.startTouch
      let { clientX: x2, clientY: y2 } = endTouch

      let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
      // console.log('distance: ', distance);
      let deltaY = Math.abs(y2 - y1)
      let rate = distance / deltaY
      if(rate > 2) {
        console.log('检测到用户在左右滑')
        if(endTouch.clientX > this.startTouch.clientX) {
          console.log('检测为右滑')
          this.select(this.selectedIndex - 1)
        } else {
          console.log('检测为左滑')
          this.select(this.selectedIndex + 1)
        }
      }
      console.log('摸完了')
      this.$nextTick(() => {
        this.playAutomatically()
      })
    },
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
        let newIndex = index + 1

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
        if(this.timerId) {
          if(this.lastSelectedIndex === this.$children.length - 1 && this.selectedIndex === 0) {
            reverse = false
          }
          if(this.lastSelectedIndex === 0 && this.selectedIndex === this.$children.length - 1) {
            reverse = true
          }
        }
        vm.reverse = reverse
        this.$nextTick(() => {
          vm.selected = selected
        })
      })
    },
    select(newIndex) {
      if(newIndex === this.names.length) { newIndex = 0 } // name.length 值为3
      if(newIndex === -1) { newIndex = this.names.length - 1}
      this.lastSelectedIndex = this.selectedIndex
      this.$emit('update:selected', this.names[newIndex])
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
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    > span {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin: 0 8px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #ddd;
      font-size: 12px;
      &:hover {
        cursor: pointer;
      }
      &.active {
        background-color: #000;
        color: #fff;
        &:hover {
          cursor: default;
        }
      }
    }
  }
}
</style>