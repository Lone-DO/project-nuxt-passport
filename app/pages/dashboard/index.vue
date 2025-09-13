<script setup lang='ts'>
const locationsStore = useLocationStore();
const { items, itemsStatus: status } = storeToRefs(locationsStore);
const isLoading = computed(() => status.value === 'pending');

onMounted(locationsStore.refreshItems);
</script>

<template>
  <section id="dashboard-list">
    <h4 class="mb-4">
      Locations
    </h4>

    <div v-if="isLoading">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <ul v-else-if="items?.length" class="flex gap-4 overflow-auto">
      <li
        v-for="(location) in items"
        :key="location?.id"
        class="card bg-base-300 flex-1/3 sm:min-w-60 shrink-0"
      >
        <LocationItem :item="location" type="location" />
      </li>
    </ul>
    <template v-else>
      <p class="text-sm">
        Add a location to get started
      </p>
      <NuxtLink to="/dashboard/new" class="btn btn-accent">
        Add Location
      </NuxtLink>
    </template>
  </section>
</template>
