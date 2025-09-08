import type { User } from 'better-auth';

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
  label: string;
  description: string | null;
} & LatLongPin;

export type Icons = {
  add: string;
  map: string;
  pin: string;
  pointerEvent: string;
  logout: string;
  search: string;
  searchPin: string;
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
