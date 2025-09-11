<script setup lang='ts'>
import type { FetchError } from 'ofetch';

import type { DropdownItem } from '~/lib/types';

import { EDITING_ROUTES } from '~/lib/constants';
import getFetchErrorMessage from '~/utils/get-fetch-error';

const $route = useRoute();
const appStore = useAppStore();
const locationStore = useLocationStore();
const { currentItem: item, currentItemError: error, currentItemStatus: status } = storeToRefs(locationStore);
const isDeleting = ref(false);
const deleteError = ref<string | null>('');
const isEditing = computed(() => EDITING_ROUTES.has($route.name as string));
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
  onClick: openModal,
}];
function openModal() {
  isModalOpen.value = true;
  (document.activeElement as HTMLAnchorElement).blur();
}

/** Form */
const deleted = ref(false);
const { handleSubmit } = useForm();

const onDelete = handleSubmit(async () => {
  try {
    isModalOpen.value = false;
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
  <article id="dashboard-location-slug" class="flex flex-col gap-2 flex-1 max-w-md">
    <span v-if="isLoading" class="loading loading-spinner loading-md" />
    <span
      v-if="!isLoading && errorMessage"
      role="alert"
      class="alert alert-error justify-center"
    > {{ errorMessage }}</span>

    <template v-if="!isLoading && item && !isEditing">
      <LocationDeleteDialog
        :location="item"
        :is-open="isModalOpen"
        @accept="onDelete"
      />
      <h4 class="mb-3">
        Location: {{ item.name }} <AppDropdown :items="dropdownItems" />
      </h4>
      <p class="text-sm">
        Description: {{ item.description || '--' }}
      </p>
      <div v-if="!item.locationLogs.length" class="text-sm">
        <i class="inline-block italic w-full">Add a location log to get started</i>
        <button class="btn btn-neutral mt-1">
          Add Location Log <Icon :name="appStore.icons.addPath" size="20" />
        </button>
      </div>
    </template>
    <NuxtPage v-if="!isLoading && item && isEditing" />
  </article>
</template>
