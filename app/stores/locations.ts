import type { MapPin } from '~/lib/types';

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
        navItems.push({
          id: location.id,
          name: location.name,
          icon: '',
          href: '#',
          lat: location.lat,
          long: location.long,
        });
        mapPins.push({
          id: location.id,
          label: location.name,
          description: location.description,
          lat: location.lat,
          long: location.long,
        });
      });
      navigationStore.items = navItems;
      navigationStore.loading = false;
      mapStore.pins = mapPins;
    }
  });

  return { items, status, refreshLocations };
});
