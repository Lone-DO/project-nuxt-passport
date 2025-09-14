<script lang='ts' setup>
import type { AsyncDataRequestStatus } from '#app';
import type { FetchError } from 'ofetch';

import type { location, locationLog } from '~/lib/db/schema';
import type { DropdownItem } from '~/lib/types';

import getFetchErrorMessage from '~/utils/get-fetch-error';

const $props = defineProps<{
  deleteUrl: string;
  error?: FetchError;
  modalTitle?: string;
  modalDescription?: string;
  item: location | locationLog;
  status: AsyncDataRequestStatus;
}>();
const $emit = defineEmits(['deleted', 'closed']);

const appStore = useAppStore();
/** General */
const isDeleting = ref(false);
const deleteError = ref<string | null>('');
const isLoading = computed(() => $props.status === 'pending' || isDeleting.value);
const errorMessage = computed(() => $props.error ? getFetchErrorMessage($props.error) : deleteError.value);
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
    await $fetch($props.deleteUrl, {
      method: 'DELETE',
    });
    deleted.value = true;
    $emit('deleted');
  }
  catch (_error) {
    const error = _error as FetchError;
    /** error.data.statusMessage is fallback for PROD captures */
    deleteError.value = getFetchErrorMessage(error);
  }
  finally {
    isDeleting.value = false;
    isModalOpen.value = false;
  }
});
</script>

<template>
  <article id="location-details" class="flex flex-col gap-2">
    <span v-if="isLoading" class="loading loading-spinner loading-md" />
    <span
      v-if="!isLoading && errorMessage"
      role="alert"
      class="alert alert-error justify-center"
    > {{ errorMessage }}</span>
    <LocationDeleteDialog
      v-if="item"
      :title="modalTitle"
      :description="modalDescription"
      :location="item"
      :is-open="isModalOpen"
      @accept="onDelete"
      @on-closed="isModalOpen = false"
    />
    <template v-if="!isLoading && item">
      <h4 class="mb-3">
        Location: {{ item.name }} <AppDropdown :items="dropdownItems" />
      </h4>
      <p class="text-sm">
        Description: {{ item.description || '--' }}
      </p>
      <slot />
    </template>
  </article>
</template>
