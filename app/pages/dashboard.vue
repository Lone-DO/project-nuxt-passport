<script setup lang="ts">
import { NAVIGATION_BASE_ITEMS, NAVIGATION_CURRENT_ITEMS } from '~/lib/constants';

const locationStore = useLocationStore();
const navigationStore = useNavigationStore();
const $route = useRoute();
const isLocationListPage = computed(() => $route.name === 'dashboard');

const { icons } = storeToRefs(useAppStore());
const { currentItem, currentItemStatus } = storeToRefs(locationStore);
onMounted(() => {
  if (!isLocationListPage.value) {
    /** WHEN user initially loads on page beyond the Location List, Force fetch */
    locationStore.refreshItems();
  }
});

effect(() => {
  if (NAVIGATION_BASE_ITEMS.has($route.name as string)) {
    navigationStore.topItems = [{
      id: 'link-dashboard',
      name: 'Locations',
      href: '/dashboard',
      icon: icons.value.map,
    }, {
      id: 'link-location-new',
      name: 'Add Location',
      href: '/dashboard/new',
      icon: icons.value.add,
    }];
  }
  else if (NAVIGATION_CURRENT_ITEMS.has($route.name as string)) {
    navigationStore.topItems = [{
      id: 'link-dashboard',
      name: 'Back to Locations',
      href: '/dashboard',
      icon: 'majesticons:arrow-left',
    }];
    if (currentItem.value && currentItemStatus.value !== 'pending') {
      navigationStore.topItems.push({
        id: 'link-dashboard-slug',
        name: currentItem.value ? currentItem.value.name : 'Loading...',
        to: {
          name: 'dashboard-location-slug',
          params: {
            slug: $route.params.slug,
          },
        },
        icon: icons.value.pin,
      }, {
        id: 'link-location-edit',
        name: 'Edit Location',
        to: {
          name: 'dashboard-location-slug-edit',
          params: {
            slug: $route.params.slug,
          },
        },
        icon: icons.value.settings,
      }, {
        id: 'link-location-new',
        name: 'Add Location Log',
        to: {
          name: 'dashboard-location-slug-new',
          params: {
            slug: $route.params.slug,
          },
        },
        icon: icons.value.addPath,
      });
    }
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
      <NuxtPage class="flex-1 max-w-md" />
      <MapClient class="flex-1" />
    </div>
  </section>
</template>
