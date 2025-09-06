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
        <MglMarker
          v-for="point in mapStore.pins"
          :key="point.id"
          :coordinates="[point.long, point.lat]"
        >
          <template #marker>
            <div class="tooltip tooltip-top" :data-tip="point.label">
              <Icon
                size="30"
                name="majesticons:map-marker-area"
                class="text-secondary"
              />
            </div>
          </template>
        </MglMarker>
      </MglMap>
    </section>
  </LazyClientOnly>
</template>
