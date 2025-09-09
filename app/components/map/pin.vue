<script lang='ts' setup>
import type { LngLatLike } from 'maplibre-gl';

import type { MapPin } from '~/lib/types';

const $props = defineProps<{
  pin: MapPin;
}>();

const mapStore = useMapStore();
const isSelected = computed(() => mapStore.selectedPin?.id === $props.pin?.id);
const coordinates = computed<LngLatLike>(() => [$props.pin?.long || 0, $props.pin?.lat || 0]);
</script>

<template>
  <MglMarker :coordinates>
    <template #marker>
      <div
        class="tooltip tooltip-top"
        :class="{ 'tooltip-open': isSelected }"
        :data-tip="pin.name"
        @mouseenter="mapStore.syncPin(pin, true, false)"
        @mouseleave="mapStore.syncPin(pin, false, false)"
      >
        <Icon
          size="30"
          name="majesticons:map-marker"
          :class="{ 'text-secondary': !isSelected, 'text-accent': isSelected }"
        />
      </div>
    </template>
    <MglPopup>
      <h3 class="text-2xl">
        {{ pin.name }}
      </h3>
      <p v-if="pin.description">
        {{ pin.description }}
      </p>
    </MglPopup>
  </MglMarker>
</template>
