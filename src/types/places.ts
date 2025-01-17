// types/places.ts
export interface PlaceSearchRequest {
  input: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface DisplayName {
  text: string;
  languageCode: string;
}

export interface Place {
  id: string;
  displayName: DisplayName;
  formattedAddress: string;
  location: Location;
}

export interface PlacesResponse {
  places: Place[];
}