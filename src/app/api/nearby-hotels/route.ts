// app/api/nearby-hotels/route.ts
import { HotelGoogleResponseSchema } from "@/types/hotels";
import { NextRequest, NextResponse } from "next/server";

interface NearbySearchRequest {
  latitude: number;
  longitude: number;
  radiusMiles: number;
}

export async function POST(request: NextRequest) {
  try {
    const { latitude, longitude, radiusMiles }: NearbySearchRequest =
      await request.json();

    if (!process.env.GOOGLE_MAPS_API_KEY) {
      throw new Error("Google Maps API key is not configured");
    }

    // Convert miles to meters for the API
    const radiusMeters = radiusMiles * 1609.34;

    const res = await fetch(
      "https://places.googleapis.com/v1/places:searchNearby",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask": [
            "places.id",
            "places.displayName",
            "places.formattedAddress",
            "places.location",
            "places.rating",
            "places.userRatingCount",
            "places.priceLevel",
            "places.websiteUri",
            "places.regularOpeningHours",
            "places.photos",
            "places.priceLevel",
            "places.nationalPhoneNumber",
            "places.regularOpeningHours",
            // "places.hotelStarRating",
          ].join(","),
        },
        body: JSON.stringify({
          locationRestriction: {
            circle: {
              center: {
                latitude: latitude,
                longitude: longitude,
              },
              radius: radiusMeters,
            },
          },
          includedTypes: ["lodging", "hotel"],
          maxResultCount: 10,
          rankPreference: "DISTANCE",
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Google API error:", errorData);
      throw new Error(`Google API error: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("places response: ", data);
    const hotels = HotelGoogleResponseSchema.transform((x) => ({
      ...x,
      photos: x.photos.map((p) => ({
        url: `https://places.googleapis.com/v1/${p.name}/media?key=${process.env.GOOGLE_MAPS_API_KEY}&maxHeightPx=128&maxWidthPx=208`,
      })),
    }))
      .array()
      .parse(data.places);

    // hotels.map((hotel) => {
    //   return {
    //     ...hotel,
    //     // photosUrls: hotel.
    //   };
    //   // `https://places.googleapis.com/v1/${photoReference}/media?key=${process.env.GOOGLE_MAPS_API_KEY}&maxHeightPx=400&maxWidthPx=400`;
    // });

    // console.log("nearby hotels:", data.places[0]);
    // console.log("nearby hotels:", data.places);
    // HotelSchema.array().parse(data.places);
    // data.places.map((place: any) => {
    //   console.log("################################");
    //   console.log("Hotel", place);
    //   HotelSchema.parse(place);
    //   console.log("################################\n");
    // });
    // data.places.forEach((place: any) => {
    // console.log(place);
    // });
    return NextResponse.json(hotels);
  } catch (error) {
    console.error("Error fetching nearby hotels:", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby hotels" },
      { status: 500 }
    );
  }
}
