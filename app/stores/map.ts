import type { MapPin } from '~/lib/types';

import { CENTER_GERMANY } from '~/lib/constants';

export const useMapStore = defineStore('useMapStore', () => {
  /** Settings */
  const zoom = ref(5);
  const center = ref(CENTER_GERMANY);
  const colorMode = useColorMode();
  const darkMode = '/styles/dark.json';
  const lightMode = 'https://tiles.openfreemap.org/styles/liberty';
  const style = computed(() => colorMode.value === 'dark' ? darkMode : lightMode);
  /** General */
  /** Pins are set via effect in locationStore */
  const pins = ref<MapPin[]>([]);
  const selectedPin = ref<MapPin | null>(null);

  onMounted(async () => {
    /** Dynamic imports as Maplibre is a ClientSide only module */
    const { useMap } = await import('@indoorequal/vue-maplibre-gl');
    const { LngLatBounds } = await import('maplibre-gl');
    const mapClient = useMap();

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
      const bounds = pins.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));
      /** https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#fitbounds */
      mapClient.map?.fitBounds(bounds, {
        padding: 60,
      });
    });
  });

  return {
    /** Settings */
    zoom,
    style,
    center,
    /** General */
    pins,
    selectedPin,
  };
});
