<script setup lang='ts'>
import type { location } from '~/lib/db/queries';

defineProps<{
  location: location;
}>();

const mapStore = useMapStore();
</script>

<template>
  <article
    class="dashboard-location-item card-body cursor-pointer"
    @mouseenter="mapStore.syncPin(location, true)"
    @mouseleave="mapStore.syncPin(location, false)"
  >
    <h2 class="card-title">
      {{ location?.name }}
    </h2>
    <p>{{ location?.description || '...' }}</p>
  </article>
</template>
