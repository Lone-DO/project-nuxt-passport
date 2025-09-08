<script setup lang='ts'>
defineProps<{ long?: number; lat?: number }>();
const appStore = useAppStore();
function pipeNumbers(num?: number) {
  return (!num) ? 0 : num.toFixed(5);
}
</script>

<template>
  <fieldset class="location-coordinates-field fieldset">
    <legend class="fieldset-legend">
      <span>To set the coordinates:</span>
    </legend>
    <ul class="list-disc ml-8 text-sm">
      <li>Drag the <Icon name="majesticons:map-marker-area" class="text-warning" /> marker on the map</li>
      <li>Double click <Icon :name="appStore.icons.pointerEvent" /> the map </li>
      <li>Search <Icon :name="appStore.icons.search" /> for a location below </li>
    </ul>
    <p class="text-gray-500">
      Long: {{ pipeNumbers(long) }}, Lat:{{ pipeNumbers(lat) }}
    </p>
  </fieldset>
</template>
