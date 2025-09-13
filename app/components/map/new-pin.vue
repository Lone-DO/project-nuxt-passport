<script lang='ts' setup>
import type { LngLatLike } from 'maplibre-gl';

import { CENTER_GERMANY } from '~/lib/constants';

const mapStore = useMapStore();
const coordinates = computed<LngLatLike>(() => {
  return !mapStore.newPin ? CENTER_GERMANY : [mapStore.newPin.long, mapStore.newPin.lat];
});
</script>

<template>
  <MglMarker
    :coordinates
    :draggable="true"
    @update:coordinates="mapStore.syncNewPinCoords"
  >
    <template #marker>
      <div
        class="tooltip tooltip-top tooltip-open text-warning z-50"
        data-tip="Drag to your desired location"
      >
        <Icon
          size="40"
          name="majesticons:map-marker-area"
        />
      </div>
    </template>
  </MglMarker>
</template>
