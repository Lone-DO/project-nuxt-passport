<script setup lang='ts'>
import { useMapStore } from '~/stores/map';

const mapStore = useMapStore();
</script>

<template>
  <LazyClientOnly>
    <template #fallback>
      <section class="skeleton flex-1" />
    </template>
    <section id="map-client" class="flex-1">
      <MglMap
        :map-style="mapStore.style"
        :center="mapStore.center"
        :zoom="mapStore.zoom"
      >
        <MglNavigationControl />
        <MapPin
          v-for="pin in mapStore.pins"
          :key="pin.id"
          :pin
        />
      </MglMap>
    </section>
  </LazyClientOnly>
</template>
