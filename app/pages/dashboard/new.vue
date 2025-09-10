<script lang='ts' setup>
import type { InsertLocation } from '~/lib/db/schema';
import type { NominatimResult } from '~/lib/types';

import { CENTER_GERMANY } from '~/lib/constants';

const [long, lat] = CENTER_GERMANY as [number, number];

const { $csrfFetch } = useNuxtApp();
const mapStore = useMapStore();
const appStore = useAppStore();
const isReady = ref(false);

function onSubmit(values: InsertLocation) {
  return $csrfFetch('/api/locations', {
    method: 'post',
    body: values,
  });
}
function onSubmitted() {
  /** TODO: After submitting, redirect user to newly created item page (/dashboard/:locationID) */
  navigateTo('/dashboard');
}
function syncSelectedLocation(result: NominatimResult) {
  mapStore.newPin = {
    id: 1,
    name: 'Added Point',
    description: '',
    long: Number(result.lon),
    lat: Number(result.lat),
    centerMap: true,
  };
}

onUnmounted(() => {
  /** onDestroy, remove global instance */
  mapStore.newPin = null;
});
onMounted(() => {
  /** onMount, stage global instance */
  mapStore.newPin = {
    id: 0,
    name: '',
    description: '',
    long,
    lat,
  };
  isReady.value = true;
});
</script>

<template>
  <article id="dashboard-new" class="flex-1 max-w-md">
    <h4 class="mb-4">
      Add Location
    </h4>
    <p class="text-sm">
      A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
    </p>
    <LocationFormBase
      v-if="isReady"
      :location="mapStore.newPin"
      :callback="onSubmit"
      cancel-to="/dashboard"
      submit-label="Add"
      :submit-icon="appStore.icons.add"
      @select="syncSelectedLocation"
      @submitted="onSubmitted"
    />
  </article>
</template>
