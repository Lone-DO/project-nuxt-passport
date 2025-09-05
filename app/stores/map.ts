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
  const pins = ref<MapPin[]>([]);
  const selectedPin = ref<MapPin | null>(null);

  onMounted(async () => {
    const { useMap } = await import('@indoorequal/vue-maplibre-gl');
    const { LngLatBounds } = await import('maplibre-gl');

    const map = useMap();

    effect(() => {
      const firstPoint = pins.value[0];
      if (!firstPoint)
        return;

      const bounds = pins.value.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds(
        [firstPoint.long, firstPoint.lat],
        [firstPoint.long, firstPoint.lat],
      ));

      map.map?.fitBounds(bounds, {
        padding: 60,
      });
    });
  });

  return {
    /** Settings */
    style,
    center,
    zoom,
    /** General */
    pins,
    selectedPin,
  };
});
