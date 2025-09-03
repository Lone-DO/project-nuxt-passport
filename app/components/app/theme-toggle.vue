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
  <label class="swap swap-rotate mx-4">
    <input
      v-model="isToggled"
      name="theme"
      type="checkbox"
    >
    <Icon class="swap-on" name="tabler:sun" />
    <Icon class="swap-off" name="tabler:moon-filled" />
  </label>
</template>
