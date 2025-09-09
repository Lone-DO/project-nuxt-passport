import type { locationWithLogs } from '~/lib/db/schema';
import type { MapPin, NavigationItem } from '~/lib/types';

import { NAVIGATION_BASE_ITEMS, NAVIGATION_EDIT_ITEMS } from '~/lib/constants';

import { useMapStore } from './map';

export const useLocationStore = defineStore('useLocationStore', () => {
  const $route = useRoute();
  const mapStore = useMapStore();
  const navigationStore = useNavigationStore();
  const locationUrlWithSlug = computed(() => `/api/locations/${$route.params?.slug || ''}`);

  const {
    data: currentItem,
    error: currentItemError,
    status: currentItemStatus,
    refresh: refreshCurrentItem,
  } = useFetch<locationWithLogs>(locationUrlWithSlug, {
    lazy: true, // Don't force First Render to wait on data
    watch: false, // Handler must be propagated manually
    immediate: false,
  });
  const {
    data: locations,
    status: itemsStatus,
    refresh: refreshItems,
  } = useFetch('/api/locations', {
    lazy: true,
  });
  /** Sort locations Alphabetically */
  const items = computed(() => locations.value?.sort((a, b) => a.name.localeCompare(b.name)));

  effect(() => {
    if (items.value && NAVIGATION_BASE_ITEMS.has($route.name as string)) {
      const navItems: NavigationItem[] = [];
      const mapPins: MapPin[] = [];
      items.value.forEach((location) => {
        const mapPin = {
          ...location,
          to: { name: 'dashboard-location-slug', params: { slug: location?.slug } },
          toLabel: 'View',
        };
        navItems.push({
          id: location.id,
          name: location.name,
          icon: '',
          to: { name: 'dashboard-location-slug', params: { slug: location?.slug } },
          mapPin,
        });
        mapPins.push(mapPin);
      });
      navigationStore.items = navItems;
      navigationStore.loading = false;
      mapStore.pins = mapPins;
    }
    else if (currentItem.value && NAVIGATION_EDIT_ITEMS.has($route.name as string)) {
      navigationStore.items = [];
      mapStore.pins = [currentItem.value];
    }
    navigationStore.loading = itemsStatus.value === 'pending';
  });

  return {
    items,
    itemsStatus,
    refreshItems,
    currentItem,
    currentItemStatus,
    currentItemError,
    refreshCurrentItem,
    locationUrlWithSlug,
  };
});
