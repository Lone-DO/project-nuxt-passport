<script lang='ts' setup>
import type { MapPin } from '~/lib/types';

const $props = defineProps<{
  pin: MapPin;
}>();

const mapStore = useMapStore();
const isSelected = computed(() => mapStore.selectedPin === $props.pin?.id);
</script>

<template>
  <MglMarker :coordinates="[pin?.long, pin?.lat]">
    <template #marker>
      <div class="tooltip tooltip-top" :data-tip="pin?.label">
        <Icon
          size="30"
          name="majesticons:map-marker-area"
          :class="{ 'text-secondary': !isSelected, 'text-accent': isSelected }"
        />
      </div>
    </template>
  </MglMarker>
</template>
