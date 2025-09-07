<script lang='ts' setup>
import type { MapPin } from '~/lib/types';

const $props = defineProps<{
  pin: MapPin;
}>();

const mapStore = useMapStore();
const isSelected = computed(() => mapStore.selectedPin?.id === $props.pin?.id);
</script>

<template>
  <MglMarker :coordinates="[pin?.long, pin?.lat]">
    <template #marker>
      <div
        class="tooltip tooltip-top"
        :class="{ 'tooltip-open': isSelected }"
        :data-tip="pin?.label"
        @mouseenter="mapStore.syncPin(pin, true, false)"
        @mouseleave="mapStore.syncPin(pin, false, false)"
      >
        <Icon
          size="30"
          name="majesticons:map-marker-area"
          :class="{ 'text-secondary': !isSelected, 'text-accent': isSelected }"
        />
      </div>
    </template>
    <MglPopup>
      <h3 class="text-2xl">
        {{ pin.label }}
      </h3>
      <p v-if="pin.description">
        {{ pin.description }}
      </p>
    </MglPopup>
  </MglMarker>
</template>
