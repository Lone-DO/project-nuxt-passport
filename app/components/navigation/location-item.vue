<script setup lang='ts'>
import type { NavigationItem } from '~/lib/types';

const $props = defineProps<{
  location: NavigationItem;
  collapsed: boolean;
}>();

const appStore = useAppStore();
const mapStore = useMapStore();
const isSelected = computed(() => mapStore.isSelected($props.location));
const isCurrentSlug = computed(() => !mapStore.currentSlug || mapStore.currentSlug === $props.location.mapPin.slug);
</script>

<template>
  <li v-show="isCurrentSlug" class="navigation-location-item">
    <NavigationButton
      :icon-name="location.icon || appStore.icons.pin"
      :name="location.name"
      :href="location.href"
      :to="location.to"
      :show-label="!collapsed"
      class="border"
      :class="{ 'border-transparent': !isSelected, 'border-accent': isSelected }"
      @mouseenter="mapStore.syncPin(location.mapPin, true)"
      @mouseleave="mapStore.syncPin(location.mapPin, false)"
    />
  </li>
</template>
