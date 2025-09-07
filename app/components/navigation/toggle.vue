<script setup lang='ts'>
const appStore = useAppStore();
const { icons } = storeToRefs(appStore);

const model = defineModel<boolean>();
function syncToggle(evt: any) {
  localStorage.setItem('nav-collapsed', String(evt.target._modelValue));
}
</script>

<template>
  <label
    id="navigation-toggle"
    class="swap swap-rotate w-full hover:bg-base-300"
    :title="`${!model ? 'collapse' : 'expand'} navigation panel`"
    :class="{ 'justify-end': !model, 'justify-center': model, 'pr-2': !model }"
  >
    <input
      v-model="model"
      name="toggle"
      type="checkbox"
      @change="syncToggle"
    >
    <Icon
      class="swap-on"
      :name="icons.navToggle.right"
      size="24"
    />
    <Icon
      class="swap-off"
      :name="icons.navToggle.left"
      size="24"
    />
  </label>
</template>
