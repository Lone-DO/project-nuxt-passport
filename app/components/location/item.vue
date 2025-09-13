<script setup lang='ts'>
import type { location, locationLog } from '~/lib/db/schema';

const $props = defineProps<{
  type: 'location' | 'locationLog';
  item: (location | locationLog) & { slug?: string; startedAt?: number; endedAt?: number };
}>();

const mapStore = useMapStore();
const locationStore = useLocationStore();
const isSelected = computed(() => mapStore.isSelected($props.item));
const to = computed(() => {
  if ($props.type === 'locationLog') {
    return {
      name: 'dashboard-location-slug-logs-id',
      params: {
        slug: locationStore.currentItem?.slug || 'fallback',
        id: $props.item.id,
      },
    };
  }
  return {
    name: 'dashboard-location-slug',
    params: {
      slug: $props.item?.slug || 'fallback',
    },
  };
});
</script>

<template>
  <NuxtLink
    :to
    class="dashboard-location-item card-body cursor-pointer border"
    :class="{ 'border-transparent': !isSelected, 'border-accent': isSelected }"
    @mouseenter="mapStore.syncPin(item, true)"
    @mouseleave="mapStore.syncPin(item, false)"
  >
    <h2 class="card-title">
      {{ item?.name }}
    </h2>
    <p>{{ item?.description || '...' }}</p>
    <template v-if="type === 'locationLog'">
      <p v-if="item?.startedAt">
        Started At: {{ new Date(item?.startedAt).toLocaleDateString() }}
      </p>
      <p v-if="item?.endedAt">
        Ended At: {{ new Date(item?.endedAt).toLocaleDateString() }}
      </p>
    </template>
  </NuxtLink>
</template>
