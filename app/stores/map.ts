import type { MapInstance } from '@indoorequal/vue-maplibre-gl';
import type { LngLat, LngLatBounds } from 'maplibre-gl';

import type { location } from '~/lib/db/schema';
import type { MapPin, MapPinExtended, NavigationItem } from '~/lib/types';

import { CENTER_GERMANY, EDITING_ROUTES } from '~/lib/constants';

export const useMapStore = defineStore('useMapStore', () => {
  /** Settings */
  const zoom = ref(5);
  const speed = ref(0.8);
  const boundOpts = {
    padding: 60,
    maxZoom: 10,
  };
  const center = ref(CENTER_GERMANY);
  const colorMode = useColorMode();
  const darkMode = '/styles/dark.json';
  const lightMode = 'https://tiles.openfreemap.org/styles/liberty';
  const style = computed(() => colorMode.value === 'dark' ? darkMode : lightMode);
  /**
   * enableZoom is disabled when triggered by MapPins,
   * OR enabled when triggered by Navigation or Dashboard Items
   */
  let enableZoom: boolean = true;
  /** General */
  const route = useRoute();
  const currentSlug = computed(() => route.params.slug);

  let mapClient: MapInstance;
  /** Pins are set via effect in locationStore */
  const pins = ref<MapPin[]>([]);
  /** Shared New location instance */
  const newPin = ref<MapPinExtended | null>(null);
  /** Currently Selected Pin */
  const selectedPin = ref<MapPin | null>(null);

  onMounted(async () => {
    /** Dynamic imports as Maplibre is a ClientSide only module */
    const { useMap } = await import('@indoorequal/vue-maplibre-gl');
    const { LngLatBounds } = await import('maplibre-gl');
    mapClient = useMap();
    let bounds: LngLatBounds | null = null;
    effect(() => {
      /** IF NO PINS, DON'T OVERRIDE DEFAULT BOUNDS */
      const [firstPoint] = pins.value;
      if (!firstPoint) {
        return;
      }
      /**
       * ELSE, USE FIRST PIN AS BASE BOUNDARY
       * https://indoorequal.github.io/vue-maplibre-gl/api/composables.html#usemap
       */
      bounds = pins.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));
      /** https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#fitbounds */
      mapClient.map?.fitBounds(bounds, boundOpts);
    });
    effect(() => {
      /** Targeted Animation onHover events */
      /** * ONLY Enable Animations while on Root Dashboard */
      if (route.name !== 'dashboard') {
        return;
      }

      if (selectedPin.value) {
        return !enableZoom
          ? null
          : flyTo(selectedPin.value);
      }
      else if (bounds && enableZoom) {
        mapClient.map?.fitBounds(bounds as LngLatBounds, boundOpts);
      }
    });

    watch(newPin, (newVal, oldVal) => {
      /** Fly to new cords onInit OR `centerMap` option is truthy (used via search form) */
      return ((newVal && !oldVal) || newVal?.centerMap) ? flyTo(newVal) : null;
    }, { immediate: true });
  });

  onBeforeRouteLeave((to) => {
    if (!EDITING_ROUTES.has(to.name as string)) {
    /** onDestroy, remove global instance */
      newPin.value = null;
      zoom.value = 5;
    }
  });

  function flyTo(pin?: MapPinExtended) {
    if (!mapClient || !pin) {
      return null;
    }
    if (pin.zoom) {
      zoom.value = pin.zoom;
    }
    return mapClient.map?.flyTo({
      center: [pin.long as number, pin.lat as number],
      speed: speed.value,
      zoom: zoom.value,
    });
  }

  /** Used for onHover events to highlight targets in MapClient, Navigation, and LocationList */
  function syncPin(pin?: NavigationItem | MapPin | location, toggle?: boolean, shouldZoom = true) {
    if (pin?.id) {
      if (selectedPin.value?.id === pin.id && !toggle) {
        selectedPin.value = null;
      }
      else if (selectedPin.value?.id !== pin.id && toggle) {
        enableZoom = shouldZoom;
        selectedPin.value = pin as MapPin;
      }
    }
  }
  /** Used for `/new` page, via onDbClick && onDrag events in MapClient */
  function syncNewPinCoords(lngLat: LngLat, centerMap = false) {
    if (newPin.value) {
      newPin.value = {
        ...newPin.value,
        long: lngLat.lng,
        lat: lngLat.lat,
        centerMap,
      };
    }
  }

  function isSelected(pin: { slug?: any; id?: number | string }) {
    if (!pin?.slug && !pin?.id) {
      return false;
    }

    if (pin.slug && currentSlug.value) {
      return pin.slug === currentSlug.value;
    }
    return selectedPin.value?.id === (pin?.id as number);
  }

  return {
    /** Settings */
    zoom,
    style,
    center,
    /** General */
    pins,
    newPin,
    currentSlug,
    selectedPin,
    /** Methods */
    flyTo,
    syncPin,
    isSelected,
    syncNewPinCoords,
  };
});
