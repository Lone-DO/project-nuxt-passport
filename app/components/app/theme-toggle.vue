<script lang='ts' setup>
const colorMode = useColorMode();

const isToggled = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set(value: boolean) {
    colorMode.preference = value ? 'dark' : 'light';
  },
});
</script>

<template>
  <label id="app-theme-toggle" class="swap swap-rotate mx-4">
    <input
      v-model="isToggled"
      name="theme"
      type="checkbox"
    >
    <Icon
      class="swap-on"
      name="majesticons:sun"
      size="24"
    />
    <Icon
      class="swap-off"
      name="majesticons:moon"
      size="24"
    />
  </label>
</template>
