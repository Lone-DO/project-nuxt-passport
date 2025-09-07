<script setup lang="ts">
const locationStore = useLocationStore();
const route = useRoute();
const isLocationListPage = computed(() => route.path === '/dashboard');
onMounted(() => {
  if (!isLocationListPage.value) {
    /** WHEN user initially loads on page beyond the Location List, Force fetch */
    locationStore.refreshLocations();
  }
});
</script>

<template>
  <section id="dashboard" class="flex w-full">
    <Navigation />
    <div
      class="flex-1 flex justify-center p-4 gap-4 w-16"
      :class="{
        'flex-col': isLocationListPage,
      }"
    >
      <NuxtPage />
      <MapClient />
    </div>
  </section>
</template>
