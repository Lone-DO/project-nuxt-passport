import type { User } from 'better-auth';
import type { RouteLocationRaw } from 'vue-router';

import type { location } from './db/schema';

declare module 'h3' {
  /** Override H3EventContext.user type to int */
  // eslint-disable-next-line ts/consistent-type-definitions
  interface H3EventContext {
    user?: Omit<User, 'id'> & {
      id: number;
    };
  }
}

export type LatLongPin = {
  lat: number;
  long: number;
};

export type MapPin = {
  id: number;
  name: string;
  description: string | null;
  slug?: string;
  to?: RouteLocationRaw;
  toLabel?: string;
} & LatLongPin;

export type Icons = {
  add: string;
  addPath: string;
  map: string;
  pin: string;
  pointerEvent: string;
  logout: string;
  search: string;
  searchPin: string;
  settings: string;
  settingsSave: string;
  navToggle: {
    left: string;
    right: string;
  };
};

export type NominatimResult = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: string[];
};

export type NavigationItem = {
  id: string | number;
  name: string;
  icon: string;
  href?: string;
  to?: RouteLocationRaw;
  mapPin?: location;
};
