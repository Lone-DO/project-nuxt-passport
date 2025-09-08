import type { LngLatLike } from 'maplibre-gl';

import type { Icons } from './types';

export const CENTER_GERMANY: LngLatLike = [10.4541194, 51.1642292];

export const LIGHT_MODE_ICONS: Icons = {
  add: 'majesticons:map-marker-plus',
  map: 'majesticons:map',
  pin: 'majesticons:map-simple-marker',
  pointerEvent: 'majesticons:hand-pointer-event',
  logout: 'majesticons:logout',
  search: 'majesticons:search-circle',
  searchPin: 'majesticons:map-simple-destination',
  navToggle: {
    left: 'majesticons:arrow-circle-left',
    right: 'majesticons:arrow-circle-right',
  },
};

export const DARK_MODE_ICONS: Icons = {
  add: 'majesticons:map-marker-plus-line',
  map: 'majesticons:map-line',
  pin: 'majesticons:map-simple-marker-line',
  pointerEvent: 'majesticons:hand-pointer-event-line',
  logout: 'majesticons:logout-line',
  search: 'majesticons:search-circle-line',
  searchPin: 'majesticons:map-simple-destination-line',
  navToggle: {
    left: 'majesticons:arrow-circle-left-line',
    right: 'majesticons:arrow-circle-right-line',
  },
};
