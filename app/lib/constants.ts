import type { LngLatLike } from 'maplibre-gl';

import type { Icons } from './types';

export const CENTER_GERMANY: LngLatLike = [10.4541194, 51.1642292];

export const NAVIGATION_BASE_ITEMS = new Set(['dashboard', 'dashboard-new']);
export const NAVIGATION_CURRENT_ITEMS = new Set(['dashboard-location-slug', 'dashboard-location-slug-edit', 'dashboard-location-slug-new']);
export const EDITING_ROUTES = new Set(['dashboard-new', 'dashboard-location-slug-edit', 'dashboard-location-slug-new']);
export const LIGHT_MODE_ICONS: Icons = {
  add: 'majesticons:map-marker-plus',
  addPath: 'majesticons:map-marker-path',
  delete: 'majesticons:trash',
  logout: 'majesticons:logout',
  map: 'majesticons:map',
  navToggle: {
    left: 'majesticons:arrow-circle-left',
    right: 'majesticons:arrow-circle-right',
  },
  pin: 'majesticons:map-simple-marker',
  pointerEvent: 'majesticons:hand-pointer-event',
  search: 'majesticons:search-circle',
  searchPin: 'majesticons:map-simple-destination',
  settings: 'majesticons:settings-cog',
  settingsSave: 'majesticons:settings-cog-check',
};

export const DARK_MODE_ICONS: Icons = {
  add: 'majesticons:map-marker-plus-line',
  addPath: 'majesticons:map-marker-path-line',
  delete: 'majesticons:trash-line',
  logout: 'majesticons:logout-line',
  map: 'majesticons:map-line',
  navToggle: {
    left: 'majesticons:arrow-circle-left-line',
    right: 'majesticons:arrow-circle-right-line',
  },
  pin: 'majesticons:map-simple-marker-line',
  pointerEvent: 'majesticons:hand-pointer-event-line',
  search: 'majesticons:search-circle-line',
  searchPin: 'majesticons:map-simple-destination-line',
  settings: 'majesticons:settings-cog-line',
  settingsSave: 'majesticons:settings-cog-check-line',
};
