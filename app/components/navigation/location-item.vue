<script setup lang='ts'>
const $props = defineProps<{
  location: NavigationItem;
  collapsed: boolean;
}>();

const appStore = useAppStore();
const mapStore = useMapStore();
const isSelected = computed(() => mapStore.selectedPin?.id === $props.location?.id);
const { icons } = storeToRefs(appStore);
</script>

<template>
  <li class="navigation-location-item">
    <NavigationButton
      :name="location.icon || icons.pin"
      :label="location.name"
      :href="location.href"
      :show-label="!collapsed"
      class="border"
      :class="{ 'border-transparent': !isSelected, 'border-accent': isSelected }"
      @mouseenter="mapStore.syncPin(location, true)"
      @mouseleave="mapStore.syncPin(location, false)"
    />
  </li>
</template>
