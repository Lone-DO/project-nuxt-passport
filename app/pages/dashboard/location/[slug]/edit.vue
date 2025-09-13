<script lang='ts' setup>
import type { location } from '~/lib/db/schema';
import type { NominatimResult } from '~/lib/types';

import { NEW_FORM_LOCATION_FIELDS } from '~/lib/constants';
import { InsertLocation } from '~/lib/db/schema';

const $emit = defineEmits(['submitted']);

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
  $emit('submitted');
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
</script>

<template>
  <article id="dashboard-location-edit">
    <LocationFormBase
      v-if="isReady"
      :value="mapStore.newPin"
      :callback="onSubmit"
      :cancel-to="{ name: 'dashboard-location-slug', params: { slug: mapStore.currentSlug } }"
      :fields="NEW_FORM_LOCATION_FIELDS"
      :schema="InsertLocation"
      submit-label="Update"
      :submit-icon="appStore.icons.settingsSave"
      @select="syncSelectedLocation"
      @submitted="onSubmitted"
    />
  </article>
</template>
