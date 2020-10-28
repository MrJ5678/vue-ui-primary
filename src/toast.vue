<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GToast"
}
</script>

<style lang="scss" scoped>
$font-size: 14px;
$toast-height: 40px;
$toast-bg: rgba(0, 0, 0, .75);
$border-radius: 4px;

.toast {
  position: fixed;top: 0;left: 50%;padding: 0 16px;height: $toast-height;font-size: $font-size;line-height: 1.8;transform: translateX(-50%);display: flex;align-items: center;background-color: $toast-bg;border-radius: $border-radius;color: #fff;box-shadow: 0 0 3px rgba(0, 0, 0, .5);
}
</style>