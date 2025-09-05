<script setup lang='ts'>
const locationsStore = useLocationStore();
const { items, status } = storeToRefs(locationsStore);

onMounted(() => {
  locationsStore.refreshLocations();
});
</script>

<template>
  <section id="dashboard-list" class="container">
    <h4 class="my-4">
      Locations
    </h4>

    <div v-if="status === 'pending'">
      <span class="loading loading-spinner loading-xl" />
    </div>
    <ul v-else-if="items?.length" class="flex flex-wrap gap-4">
      <li
        v-for="(location) in items"
        :key="location?.id"
        class="card bg-base-300 flex-1/3 sm:min-w-60"
      >
        <DashboardLocationItem :location />
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
