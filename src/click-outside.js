let callbacks = []

let onClickDocument = (e) => {
  callbacks.forEach(item => {
    let {target} = e
    if(item.el === target || item.el.contains(target)) {
      return true
    }
    item.callbacks()
  })
}
document.addEventListener('click', onClickDocument)

export default {
  bind: function(el, binding) {
    callbacks.push({el, callbacks: binding.value})
  }
}

let removeListener = () => {
  document.removeEventListener('click', onClickDocument)
}

export {removeListener}