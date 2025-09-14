<script lang='ts' setup>
import { EDITING_ROUTES } from '~/lib/constants';

/** Stores */
const $route = useRoute();
const locationStore = useLocationStore();
const { currentItem, currentLog: item, currentLogError: error, currentLogStatus: status } = storeToRefs(locationStore);
/** General */
const isNestedRoute = computed(() => String($route.name).includes('dashboard-location-slug-logs-id-'));
const handlers = computed(() => {
  if (EDITING_ROUTES.has($route.name as string)) {
    return { submitted: locationStore.refreshCurrentItem };
  }
  return {};
});

watch(() => locationStore.locationUrlWithId, () => {
  /** onRouteParams change, refresh current location */
  locationStore.refreshCurrentLog();
}, { immediate: true });

function onDeleted() {
  navigateTo({
    name: 'dashboard-location-slug',
    params: { params: currentItem.value?.slug },
  });
}
const deleteUrl = computed(() => `/api/locations/${currentItem.value?.slug}/logs/${item.value?.id}`);
const modalTitle = computed(() => `Delete Location Log: ${item.value?.name}`);
const modalDescription = 'Deleting this location log will also delete all associated data';
</script>

<template>
  <div id="location-log-id">
    <LocationDetails
      v-if="!isNestedRoute"
      :item
      :error
      :status
      :delete-url
      :modal-title
      :modal-description
      type="locationLog"
      @deleted="onDeleted"
    >
      <template v-if="item">
        <p class="text-sm">
          Started At: {{ new Date(item?.startedAt).toLocaleDateString() }}
        </p>
        <p class="text-sm">
          Ended At: {{ new Date(item?.endedAt).toLocaleDateString() }}
        </p>
      </template>
    </LocationDetails>
    <NuxtPage v-else v-on="handlers" />
  </div>
</template>
