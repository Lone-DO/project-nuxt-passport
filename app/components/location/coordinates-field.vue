<script setup lang='ts'>
defineProps<{ long?: number; lat?: number }>();

function pipeNumbers(num?: number) {
  return (!num) ? 0 : num.toFixed(5);
}
// const { newPin } = storeToRefs(mapStore);
</script>

<template>
  <fieldset class="location-coordinates-field fieldset">
    <legend class="fieldset-legend">
      <span>Drag the</span>
      <Icon name="majesticons:map-marker" class="text-warning" />
      <span>marker to your desired location, or double click</span>
    </legend>
    <p class="text-gray-500">
      Long: {{ pipeNumbers(long) }}, Lat:{{ pipeNumbers(lat) }}
    </p>
  </fieldset>
</template>
