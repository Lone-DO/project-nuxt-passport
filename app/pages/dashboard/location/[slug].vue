<script setup lang='ts'>
import { EDITING_ROUTES } from '~/lib/constants';

/** Store */
const $route = useRoute();
const appStore = useAppStore();
const locationStore = useLocationStore();
const { currentItem: item, currentItemError: error, currentItemStatus: status } = storeToRefs(locationStore);
/** General */
const isNestedRoute = computed(() => String($route.name).includes('dashboard-location-slug-'));

const handlers = computed(() => {
  if (EDITING_ROUTES.has($route.name as string)) {
    return { submitted: locationStore.refreshCurrentItem };
  }
  return {};
});
watch(() => locationStore.locationUrlWithSlug, () => {
  /** onRouteParams change, refresh current location */
  locationStore.refreshCurrentItem();
}, { immediate: true });

/** Detail Props */
const onDeleted = () => navigateTo({ name: 'dashboard' });
const deleteUrl = computed(() => `/api/locations/${item.value?.slug}`);
const modalTitle = computed(() => `Delete Location: ${item.value?.name}`);
const modalDescription = 'Deleting this location will also delete all associated logs';
</script>

<template>
  <div id="location-slug">
    <LocationDetails
      v-if="!isNestedRoute"
      :item
      :error
      :status
      :delete-url
      :modal-title
      :modal-description
      type="location"
      @deleted="onDeleted"
    >
      <template v-if="item">
        <div v-if="!item.locationLogs.length" class="text-sm">
          <i class="inline-block italic w-full">Add a location log to get started</i>
          <NuxtLink
            class="btn btn-neutral mt-1"
            :to="{
              name: 'dashboard-location-slug-add',
              params: {
                slug: $route.params.slug,
              },
            }"
          >
            Add Location Log <Icon :name="appStore.icons.addPath" size="20" />
          </NuxtLink>
        </div>
        <ul v-if="item.locationLogs.length" class="flex gap-4 overflow-auto">
          <li
            v-for="(location) in item.locationLogs"
            :key="location?.id"
            class="card bg-base-300 flex-1/3 sm:min-w-60 shrink-0"
          >
            <LocationItem :item="location" type="locationLog" />
          </li>
        </ul>
      </template>
    </LocationDetails>
    <NuxtPage v-else v-on="handlers" />
  </div>
</template>
