<script setup lang="ts">
const locationStore = useLocationStore();
const route = useRoute();
onMounted(() => {
  if (route.path !== '/dashboard') {
    /** WHEN user initially loads on page beyond the Location List, Force fetch */
    locationStore.refreshLocations();
  }
});
</script>

<template>
  <section id="dashboard" class="flex w-full">
    <DashboardNavigation />
    <div class="flex-1 flex justify-center p-4">
      <NuxtPage />
    </div>
  </section>
</template>
