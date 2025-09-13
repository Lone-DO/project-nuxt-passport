import type { locationLog, locationWithLogs } from '~/lib/db/schema';
import type { MapPin, NavigationItem } from '~/lib/types';

import { NAVIGATION_BASE_ITEMS, NAVIGATION_CURRENT_ITEMS } from '~/lib/constants';

import { useMapStore } from './map';

export const useLocationStore = defineStore('useLocationStore', () => {
  const $route = useRoute();
  const appStore = useAppStore();
  const mapStore = useMapStore();
  const navigationStore = useNavigationStore();
  const currentSlug = computed<string>(() => $route.params.slug as string);
  const currentLogId = computed<number>(() => $route.params?.id as unknown as number);
  const locationUrlWithSlug = computed<string>(() => `/api/locations/${currentSlug.value}`);
  /** API Helpers */

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
    data: currentLog,
    error: currentLogError,
    status: currentLogStatus,
    refresh: refreshCurrentLog,
  } = useFetch<locationLog>(`${locationUrlWithSlug.value}/logs/${currentLogId.value}`, {
    lazy: true, // Don't force First Render to wait on data
    watch: false, // Handler must be propagated manually
    immediate: false,
  });
  const {
    data: locations,
    status: itemsStatus,
    refresh: refreshItems,
  } = useFetch<locationWithLogs[]>('/api/locations', {
    lazy: true,
  });
  /** Sort locations Alphabetically */
  const items = computed(() => sortDataByKey('name', (locations.value || [])));
  /** Unpacking Helpers */
  function unpackLocations() {
    mapStore.pins = [];
    navigationStore.items = [];
    const initialData = { navItems: <NavigationItem[]>[], mapPins: <MapPin[]>[] };
    const { navItems, mapPins } = !items.value
      ? initialData
      : items.value.reduce((data, location) => {
          const mapPin = {
            ...location,
            to: { name: 'dashboard-location-slug', params: { slug: location?.slug } },
            toLabel: 'View',
          };
          data.navItems.push({
            id: location.id,
            name: location.name,
            icon: '',
            to: { name: 'dashboard-location-slug', params: { slug: location?.slug } },
            mapPin,
          });
          data.mapPins.push(mapPin);
          return data;
        }, initialData);

    navigationStore.items = navItems;
    mapStore.pins = mapPins;
  }

  function unpackLogs() {
    mapStore.pins = [];
    navigationStore.items = [];
    if (!currentItem.value) {
      return;
    }
    const initialData = { navItems: <NavigationItem[]>[], mapPins: <MapPin[]>[] };
    const sorted = sortDataByKey('startedAt', currentItem.value.locationLogs) || [];
    const { navItems, mapPins } = (!currentItem.value?.locationLogs?.length || !currentSlug.value)
      ? initialData
      : (sorted).reduce((data, log) => {
          const to = { name: 'dashboard-location-slug-logs-id', params: { slug: currentSlug.value, id: log.id } };
          const mapPin = {
            ...log,
            to,
            toLabel: 'View Log',
            slug: '',
            icon: appStore.icons.pin,
          };
          data.navItems.push({
            id: log.id,
            name: log.name,
            icon: appStore.icons.pin,
            to,
            mapPin,
          });
          data.mapPins.push(mapPin);
          return data;
        }, initialData);

    navigationStore.items = navItems;
    mapStore.pins = [...mapPins, currentItem.value];
  }

  effect(() => {
    if (items.value && NAVIGATION_BASE_ITEMS.has($route.name as string)) {
      unpackLocations();
    }
    else if (currentItem.value && NAVIGATION_CURRENT_ITEMS.has($route.name as string)) {
      unpackLogs();
    }
    navigationStore.loading = itemsStatus.value === 'pending';
  });

  return {
    items,
    itemsStatus,
    refreshItems,
    locationUrlWithSlug,
    /** Location */
    currentItem,
    currentItemError,
    currentItemStatus,
    currentSlug,
    refreshCurrentItem,
    /** LocationLog */
    currentLog,
    currentLogId,
    currentLogError,
    currentLogStatus,
    refreshCurrentLog,
  };
});
