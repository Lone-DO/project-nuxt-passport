<script setup lang='ts'>
const appStore = useAppStore();
const locationStore = useLocationStore();

const { currentItem: item, currentItemError: error, currentItemStatus: status } = storeToRefs(locationStore);
const busy = computed(() => status.value === 'pending');

watch(() => locationStore.locationUrlWithSlug, () => {
  /** onRouteParams change, refresh current location */
  locationStore.refreshCurrentItem();
}, { immediate: true });
</script>

<template>
  <article id="dashboard-location-slug" class="flex flex-col gap-2 flex-1 max-w-md">
    <span v-if="busy" class="loading loading-spinner loading-md" />
    <span
      v-if="!busy && error"
      role="alert"
      class="alert alert-error justify-center"
    > {{ error.statusMessage }}</span>

    <template v-if="!busy && item">
      <h4 class="mb-3">
        Location: {{ item.name }}
      </h4>
      <p class="text-sm">
        {{ item.description }}
      </p>
      <div v-if="!item.locationLogs.length" class="text-sm">
        <i class="inline-block italic w-full">Add a location log to get started</i>
        <button class="btn btn-neutral mt-1">
          Add Location Log <Icon :name="appStore.icons.addPath" size="20" />
        </button>
      </div>
    </template>
  </article>
</template>
