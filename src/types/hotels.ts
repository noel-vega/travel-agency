// types/hotels.ts
export interface NearbyHotelSearchRequest {
  latitude: number;
  longitude: number;
  radiusMiles: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface DisplayName {
  text: string;
  languageCode: string;
}

export interface Period {
  open: {
    day: number;
    hour: number;
    minute: number;
    date?: {
      year: number;
      month: number;
      day: number;
    };
  };
  close: {
    day: number;
    hour: number;
    minute: number;
    date?: {
      year: number;
      month: number;
      day: number;
    };
  };
}

export interface RegularOpeningHours {
  openNow: boolean;
  periods: Period[];
  weekdayDescriptions: string[];
}

export type PriceLevel =
  | 'PRICE_LEVEL_FREE'
  | 'PRICE_LEVEL_INEXPENSIVE'
  | 'PRICE_LEVEL_MODERATE'
  | 'PRICE_LEVEL_EXPENSIVE'
  | 'PRICE_LEVEL_VERY_EXPENSIVE'
  | 'PRICE_LEVEL_UNSPECIFIED';

export interface Hotel {
  id: string;
  displayName: DisplayName;
  formattedAddress: string;
  location: Location;
  rating?: number;
  priceLevel?: PriceLevel;
  websiteUri?: string;
  regularOpeningHours?: RegularOpeningHours;
  // Optional: Add these if you need them
  // googleMapsUri?: string;
  // internationalPhoneNumber?: string;
  // nationalPhoneNumber?: string;
  // currentOpeningHours?: RegularOpeningHours;
  // primaryType?: string;
  // types?: string[];
}

export interface NearbyHotelsResponse {
  places: Hotel[];
}