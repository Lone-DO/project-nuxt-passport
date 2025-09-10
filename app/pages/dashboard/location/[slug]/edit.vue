<script lang='ts' setup>
import type { InsertLocation, location } from '~/lib/db/schema';
import type { NominatimResult } from '~/lib/types';

const { $csrfFetch } = useNuxtApp();
const appStore = useAppStore();
const locationStore = useLocationStore();
const mapStore = useMapStore();
const { currentItem } = storeToRefs(locationStore);
const isReady = ref(false);
const submittedValues = ref<location | null>(null);
async function onSubmit(values: InsertLocation) {
  submittedValues.value = await $csrfFetch(`/api/locations/${mapStore.currentSlug}`, {
    method: 'put',
    body: values,
  });
}
function onSubmitted() {
  /** TODO: After submitting, redirect user to newly created item page (/dashboard/:locationID) */
  navigateTo({ name: 'dashboard-location-slug', params: { slug: submittedValues.value?.slug } });
  locationStore.refreshCurrentItem();
}
function syncSelectedLocation(result: NominatimResult) {
  mapStore.newPin = {
    id: currentItem.value?.id as number,
    name: result?.name as string,
    description: mapStore.newPin?.description as string,
    long: Number(result.lon),
    lat: Number(result.lat),
    centerMap: true,
  };
}

effect(() => {
  if (currentItem.value) {
    mapStore.newPin = {
      id: currentItem.value.id,
      name: currentItem.value.name,
      description: currentItem.value.description,
      long: currentItem.value.long as number,
      lat: currentItem.value.lat as number,
    };
    isReady.value = true;
  }
});

onUnmounted(() => {
  /** onDestroy, remove global instance */
  mapStore.newPin = null;
});
</script>

<template>
  <article id="dashboard-new" class="flex-1 max-w-md">
    <LocationFormBase
      v-if="isReady"
      :location="mapStore.newPin"
      :callback="onSubmit"
      :cancel-to="{ name: 'dashboard-location-slug', params: { slug: mapStore.currentSlug } }"
      submit-label="Update"
      :submit-icon="appStore.icons.settingsSave"
      @select="syncSelectedLocation"
      @submitted="onSubmitted"
    />
  </article>
</template>
