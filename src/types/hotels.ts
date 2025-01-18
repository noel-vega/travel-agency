import { z } from "zod";

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
  | "PRICE_LEVEL_FREE"
  | "PRICE_LEVEL_INEXPENSIVE"
  | "PRICE_LEVEL_MODERATE"
  | "PRICE_LEVEL_EXPENSIVE"
  | "PRICE_LEVEL_VERY_EXPENSIVE"
  | "PRICE_LEVEL_UNSPECIFIED";

// interface Photo {
//   name: string;
//   widthPx?: number;
//   heightPx?: number;
//   googleMapsUri: string;
//   authorAttributions: {
//     photoUri: string;
//   }[];
// }

// export interface Hotel {
//   id: string;
//   displayName: DisplayName;
//   formattedAddress: string;
//   location: Location;
//   nationalPhoneNumber?: string;
//   rating: number;
//   userRatingCount: number;
//   websiteUri?: string;
//   regularOpeningHours?: RegularOpeningHours;
//   photos?: Photo[];
//   // Optional: Add these if you need them
//   // googleMapsUri?: string;
//   // internationalPhoneNumber?: string;
//   // nationalPhoneNumber?: string;
//   // currentOpeningHours?: RegularOpeningHours;
//   // primaryType?: string;
//   // types?: string[];
// }

export interface NearbyHotelsResponse {
  places: Hotel[];
}

export const HotelGoogleResponseSchema = z.object({
  id: z.string(),
  displayName: z.object({
    text: z.string(),
    languageCode: z.string(),
  }),
  formattedAddress: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  nationalPhoneNumber: z.string().optional(),
  rating: z.number(),
  userRatingCount: z.number(),
  websiteUri: z.string().optional(),
  photos: z
    .object({
      name: z.string(),
    })
    .partial()
    .array()
    .default([]),
  // `https://places.googleapis.com/v1/${photoReference}/media?key=${process.env.GOOGLE_MAPS_API_KEY}&maxHeightPx=400&maxWidthPx=400`
  regularOpeningHours: z
    .object({
      openNow: z.boolean(),
      periods: z.any().array(),
      weekdayDescription: z.any().array().optional(),
      nextCloseTime: z.coerce.date().optional(),
    })
    .optional(),
});

export type HotelGoogleResponse = z.infer<typeof HotelGoogleResponseSchema>;

export const HotelSchema = z.object({
  id: z.string(),
  displayName: z.object({
    text: z.string(),
    languageCode: z.string(),
  }),
  formattedAddress: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  nationalPhoneNumber: z.string().optional(),
  rating: z.number(),
  userRatingCount: z.number(),
  websiteUri: z.string().optional(),
  photos: z
    .object({
      url: z.string(),
    })
    .array()
    .default([]),
  regularOpeningHours: z
    .object({
      openNow: z.boolean(),
      periods: z.any().array(),
      weekdayDescription: z.any().array().optional(),
      nextCloseTime: z.coerce.date().optional(),
    })
    .optional(),
});

export type Hotel = z.infer<typeof HotelSchema>;
