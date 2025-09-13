<script setup lang='ts'>
import type { FetchError } from 'ofetch';

import type { DropdownItem } from '~/lib/types';

import { EDITING_ROUTES } from '~/lib/constants';
import getFetchErrorMessage from '~/utils/get-fetch-error';

/** Store */
const $route = useRoute();
const appStore = useAppStore();
const locationStore = useLocationStore();
const { currentItem: item, currentItemError: error, currentItemStatus: status } = storeToRefs(locationStore);
/** General */
const isDeleting = ref(false);
const deleteError = ref<string | null>('');
const handlers = computed(() => {
  if (EDITING_ROUTES.has($route.name as string)) {
    return { submitted: locationStore.refreshCurrentItem };
  }
  return {};
});
const isNestedRoute = computed(() => String($route.name).includes('dashboard-location-slug-'));
const isLoading = computed(() => status.value === 'pending' || isDeleting.value);
const errorMessage = computed(() => error?.value?.statusMessage || deleteError.value);
watch(() => locationStore.locationUrlWithSlug, () => {
  /** onRouteParams change, refresh current location */
  locationStore.refreshCurrentItem();
}, { immediate: true });

/** Modal */
const isModalOpen = ref(false);
const dropdownItems: DropdownItem[] = [{
  icon: appStore.icons.delete,
  label: 'Delete',
  onClick: () => (isModalOpen.value = true),
}];

/** Form */
const deleted = ref(false);
const { handleSubmit } = useForm();

const onDelete = handleSubmit(async () => {
  try {
    deleteError.value = null;
    isDeleting.value = true;
    await $fetch(`/api/locations/${item.value?.slug}`, {
      method: 'DELETE',
    });
    deleted.value = true;
    navigateTo('/dashboard');
  }
  catch (_error) {
    const error = _error as FetchError;
    /** error.data.statusMessage is fallback for PROD captures */
    deleteError.value = getFetchErrorMessage(error);
  }
  finally {
    isDeleting.value = false;
  }
});
</script>

<template>
  <article id="dashboard-location-slug" class="flex flex-col gap-2">
    <span v-if="isLoading" class="loading loading-spinner loading-md" />
    <span
      v-if="!isLoading && errorMessage"
      role="alert"
      class="alert alert-error justify-center"
    > {{ errorMessage }}</span>

    <template v-if="!isLoading && item && !isNestedRoute">
      <LocationDeleteDialog
        :location="item"
        :is-open="isModalOpen"
        @accept="onDelete"
        @on-closed="isModalOpen = false"
      />
      <h4 class="mb-3">
        Location: {{ item.name }} <AppDropdown :items="dropdownItems" />
      </h4>
      <p class="text-sm">
        Description: {{ item.description || '--' }}
      </p>
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
    <NuxtPage v-if="!isLoading && item && isNestedRoute" v-on="handlers" />
  </article>
</template>
