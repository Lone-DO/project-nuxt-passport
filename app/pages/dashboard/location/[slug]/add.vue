<script lang='ts' setup>
import type { NominatimResult } from '~/lib/types';

import { CENTER_GERMANY, NEW_FORM_LOCATION_LOG_FIELDS } from '~/lib/constants';
import { InsertLocationLog } from '~/lib/db/schema';

const $emit = defineEmits(['submitted']);
const [long, lat] = CENTER_GERMANY as [number, number];
const { $csrfFetch } = useNuxtApp();
const mapStore = useMapStore();
const appStore = useAppStore();
const locationStore = useLocationStore();
const isReady = ref(false);

const backLink = computed(() => ({ name: 'dashboard-location-slug', params: { slug: locationStore.currentItem?.slug } }));

function onSubmit(values: InsertLocationLog) {
  return $csrfFetch(`/api/locations/${mapStore.currentSlug}/add`, {
    method: 'post',
    body: values,
  });
}
function onSubmitted() {
  /** TODO: After submitting, redirect user to newly created item page (/dashboard/:locationID) */
  navigateTo(backLink.value);
  $emit('submitted');
}
function syncSelectedLocation(result: NominatimResult) {
  mapStore.newPin = {
    id: 0,
    name: 'Added Point',
    description: '',
    long: Number(result.lon),
    lat: Number(result.lat),
    centerMap: true,
  };
}

onMounted(() => {
  /** onMount, stage global instance */
  mapStore.newPin = {
    id: 0,
    name: '',
    description: '',
    long: locationStore.currentItem?.long || long,
    lat: locationStore.currentItem?.lat || lat,
    startedAt: new Date().getTime(),
    endedAt: new Date().getTime(),
    centerMap: true,
  };
  isReady.value = true;
});
</script>

<template>
  <article id="dashboard-location-log-new">
    <h4 class="mb-4">
      Add Location Log
    </h4>
    <p class="text-sm">
      Logs are experiences you had while visiting the target location: {{ locationStore.currentItem?.name }}
    </p>
    <LocationFormBase
      v-if="isReady"
      :value="mapStore.newPin"
      :callback="onSubmit"
      :cancel-to="backLink"
      :fields="NEW_FORM_LOCATION_LOG_FIELDS"
      :schema="InsertLocationLog"
      submit-label="Add"
      :submit-icon="appStore.icons.addPath"
      @select="syncSelectedLocation"
      @submitted="onSubmitted"
    />
  </article>
</template>
