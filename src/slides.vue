<template>
  <div class="slides">
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
      lastSelectedIndex: undefined
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
    console.log('this.lastSelectedIndex')
    console.log(this.lastSelectedIndex)
    console.log('this.selectedIndex')
    console.log(this.selectedIndex)
    this.updateChildren()
  },
  methods: {
    playAutomatically() {
      let index = this.names.indexOf(this.getSelected())
      // setInterval(() => {
      //   if(index === names.length - 1) { index = -1 } // name.length 值为3
      //   this.$emit('update:selected', names[index + 1])
      //   index++
      // }, 3000)
      let run = () => {
        console.log(index)
        let newIndex = index - 1
        if(newIndex === this.names.length) { newIndex = 0 } // name.length 值为3
        if(newIndex === -1) { newIndex = this.names.length - 1}
        this.select(newIndex)
        setTimeout(run, 3000)
      }
      // setTimeout(run, 3000)
    },
    getSelected() {
      let first = this.$children[0]
      return this.selected || first.name
    },
    updateChildren() {
      let selected = this.getSelected()
      this.$children.forEach(vm => {
        vm.reverse = this.selectedIndex <= this.lastSelectedIndex
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
  border: 1px solid black;
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