<script lang='ts' setup>
import type { FetchError } from 'ofetch';

import type { DropdownItem } from '~/lib/types';

import getFetchErrorMessage from '~/utils/get-fetch-error';

/** Stores */
const $route = useRoute();
const appStore = useAppStore();
const locationStore = useLocationStore();
const { currentItem, currentLog: item, currentLogError: error, currentLogStatus: status } = storeToRefs(locationStore);
/** General */
const isDeleting = ref(false);
const deleteError = ref<string | null>('');
const isLoading = computed(() => status.value === 'pending' || isDeleting.value);
const errorMessage = computed(() => error?.value?.statusMessage || deleteError.value);
const isNestedRoute = computed(() => String($route.name).includes('dashboard-location-slug-logId-'));
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
watch(() => locationStore.locationUrlWithId, () => {
  /** onRouteParams change, refresh current location */
  locationStore.refreshCurrentLog();
}, { immediate: true });
const onDelete = handleSubmit(async () => {
  try {
    deleteError.value = null;
    isDeleting.value = true;
    await $fetch(`/api/locations/${currentItem.value?.slug}/logs/${item.value?.id}`, {
      method: 'DELETE',
    });
    deleted.value = true;
    navigateTo({
      name: 'dashboard-location-slug',
      params: { params: currentItem.value?.slug },
    });
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
  <article id="dashboard-location-slug-logId" class="flex flex-col gap-2">
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
      <p class="text-sm">
        Started At: {{ new Date(item?.startedAt).toLocaleDateString() }}
      </p>
      <p class="text-sm">
        Ended At: {{ new Date(item?.endedAt).toLocaleDateString() }}
      </p>
    </template>
  </article>
</template>
