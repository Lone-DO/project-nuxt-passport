<script setup lang='ts'>
import type { location } from '~/lib/db/schema';

const $props = defineProps<{
  location: location;
}>();

const mapStore = useMapStore();
const isSelected = computed(() => mapStore.selectedPin?.id === $props.location?.id);
</script>

<template>
  <NuxtLink
    :to="{ name: 'dashboard-location-slug', params: { slug: location?.slug } }"
    class="dashboard-location-item card-body cursor-pointer border"
    :class="{ 'border-transparent': !isSelected, 'border-accent': isSelected }"
    @mouseenter="mapStore.syncPin(location, true)"
    @mouseleave="mapStore.syncPin(location, false)"
  >
    <h2 class="card-title">
      {{ location?.name }}
    </h2>
    <p>{{ location?.description || '...' }}</p>
  </NuxtLink>
</template>
