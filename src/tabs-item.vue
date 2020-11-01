<template>
  <div class="tabs-item" :class="classes" @click="xxx">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GTabsItem",
  inject: ['eventBus'],
  data() {
    return {
      active: false
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    name: {
      type: String | Number,
      required: true
    }
  },
  computed: {
    classes() {
      return {
        active: this.active
      }
    }
  },
  created() {
    this.eventBus.$on('update:selected', (name) => {
      this.active = name === this.name;
    })
  },
  methods: {
    xxx() {
      this.eventBus.$emit('update:selected', this.name, this)
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: #1890ff;
.tabs-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 1em;
  height: 100%;
  cursor: pointer;
  &.active {
    color: $blue;
    font-weight: bold;
  }
}
</style>