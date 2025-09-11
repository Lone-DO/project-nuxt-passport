<script setup lang='ts'>
import type { MglEvent } from '@indoorequal/vue-maplibre-gl';

import { EDITING_ROUTES } from '~/lib/constants';
import { useMapStore } from '~/stores/map';

const mapStore = useMapStore();
const route = useRoute();
const addingNewLocation = computed(() => EDITING_ROUTES.has(route.name as string));

function syncCords(clickEvt: MglEvent<'dblclick'>) {
  if (mapStore.newPin) {
    mapStore.syncNewPinCoords(clickEvt.event.lngLat);
  }
}
</script>

<template>
  <LazyClientOnly>
    <template #fallback>
      <section class="skeleton " />
    </template>
    <section id="map-client">
      <MglMap
        :map-style="mapStore.style"
        :center="mapStore.center"
        :zoom="mapStore.zoom"
        @map:dblclick="syncCords"
      >
        <MglNavigationControl />
        <MapPin
          v-for="pin in mapStore.pins"
          :key="pin.id"
          :pin
        />
        <MapNewPin v-if="addingNewLocation" />
      </MglMap>
    </section>
  </LazyClientOnly>
</template>
