import type { MapPin, NavigationItem } from '~/lib/types';

import { useMapStore } from './map';

export const useLocationStore = defineStore('useLocationStore', () => {
  const {
    data,
    status,
    refresh: refreshLocations,
  } = useFetch('/api/locations', {
    lazy: true,
  });
  /** Sort locations Alphabetically */
  const items = computed(() => data.value?.sort((a, b) => a.name.localeCompare(b.name)));

  const navigationStore = useNavigationStore();
  const mapStore = useMapStore();
  effect(() => {
    if (items.value) {
      navigationStore.loading = true;
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
          lat: location.lat,
          long: location.long,
          mapPin,
        });
        /** WHEN no slug param exist, assign All pins */
        if (!mapStore.currentSlug) {
          mapPins.push(mapPin);
        }
        /**
         * ELSE only assign current Pin
         * This controls the mapClient's initial focus
         */
        else if (mapPin.slug === mapStore.currentSlug) {
          mapPins.push(mapPin);
        }
      });
      navigationStore.items = navItems;
      navigationStore.loading = false;
      mapStore.pins = mapPins;
    }
  });

  return { items, status, refreshLocations };
});
