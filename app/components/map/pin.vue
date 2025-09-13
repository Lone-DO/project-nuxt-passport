<script lang='ts' setup>
import type { LngLatLike } from 'maplibre-gl';

import type { MapPin } from '~/lib/types';

const $props = defineProps<{
  pin: MapPin;
}>();

const mapStore = useMapStore();
const isSelected = computed(() => mapStore.isSelected($props.pin));
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
          :name="pin.icon || 'majesticons:map-marker'"
          :class="{ 'text-secondary': !isSelected, 'text-accent': isSelected }"
        />
      </div>
    </template>
    <MglPopup>
      <h3 class="text-xl">
        {{ pin.name }}
      </h3>
      <p v-if="pin.description">
        {{ pin.description }}
      </p>
      <p v-if="pin.to" class="flex justify-end mt-4">
        <NuxtLink :to="pin.to" class="btn btn-sm btn-outline">
          {{ pin.toLabel }}
        </NuxtLink>
      </p>
    </MglPopup>
  </MglMarker>
</template>
