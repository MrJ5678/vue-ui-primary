<template>
  <div class="col" :class="colClasses" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
let validator = (value) => {
  let keys = Object.keys(value)
  let vaild = true
  keys.forEach(key => {
    if(!['span', 'offset'].includes(key)) {
      return vaild = false
    }
  })
  return true
}

let createClasses = (obj, str = '') => {
  let array = []
  if(!obj) { return [] }
  if(obj.span) {array.push(`col-${str}${obj.span}`)}
  if(obj.offset) {array.push(`offset-${str}${obj.offset}`)}
  return array
}
export default {
  name: 'GCol',
  props: {
    span: {
      type: [Number, String]
    },
    offset: {
      type: [Number, String]
    },
    pad: { type: Object, validator },
    narrowPc: { type: Object, validator },
    pc: { type: Object, validator },
    widePc: { type: Object, validator }
  },
  data() {
    return {
      gutter: 0,
    }
  },
  computed: {
    colClasses() {
      let {span, offset, pad, narrowPc, pc, widePc} = this

      return [
        ...createClasses({span, offset}),
        ...createClasses(pad, 'pad-'),
        ...createClasses(narrowPc, 'narrow-pc-'),
        ...createClasses(pc, 'pc-'),
        ...createClasses(widePc, 'wide-pc-')
      ]
    },
    colStyle() {
      return {
        paddingLeft: this.gutter / 2 + 'px',
        paddingRight: this.gutter / 2 + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.col {
  //height: 100px;width: 50%;
  $class-prefix: col-;

  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: ($n / 24) * 100% ;
    }
  }

  $class-prefix: offset-;

  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }

  @media (min-width: 577px) {
    $class-prefix: col-pad-;

    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100% ;
      }
    }

    $class-prefix: offset-pad-;

    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
  @media (min-width: 769px) {
    $class-prefix: col-narrow-pc-;

    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100% ;
      }
    }

    $class-prefix: offset-narrow-pc-;

    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
  @media (min-width: 993px) {
    $class-prefix: col-pc-;

    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100% ;
      }
    }

    $class-prefix: offset-pc-;

    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
  @media (min-width: 1201px) {
    $class-prefix: col-wide-pc-;

    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100% ;
      }
    }

    $class-prefix: offset-wide-pc-;

    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }

}
</style>