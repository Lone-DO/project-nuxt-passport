<script setup lang='ts'>
import type { NavigationItem } from '~/lib/types';

const $props = defineProps<{
  type: 'location' | 'locationLog';
  item: NavigationItem;
  collapsed: boolean;
}>();
/** Stores */
const appStore = useAppStore();
const mapStore = useMapStore();
const locationStore = useLocationStore();
/** General */
const isSelected = computed(() => mapStore.isSelected($props.item));
const to = computed(() => {
  if ($props.type === 'locationLog') {
    return {
      name: 'dashboard-location-slug-logs-id',
      params: {
        slug: locationStore.currentItem?.slug || 'fallback',
        id: $props.item?.id,
      },
    };
  }
  return {
    name: 'dashboard-location-slug',
    params: {
      slug: $props.item?.mapPin?.slug || 'fallback',
    },
  };
});
</script>

<template>
  <NavigationButton
    :icon-name="item.icon || appStore.icons.mark"
    :name="item.name"
    :to
    :show-label="!collapsed"
    class="navigation-location-item border"
    :class="{ 'border-transparent': !isSelected, 'border-accent': isSelected }"
    @mouseenter="mapStore.syncPin(item.mapPin, true)"
    @mouseleave="mapStore.syncPin(item.mapPin, false)"
  />
</template>
