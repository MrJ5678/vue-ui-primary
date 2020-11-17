<template>
  <div class="tabs-body">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GTabsBody",
  inject: ['eventBus'],
}
</script>

<style scoped>
.tabs-body {}
</style>