// app/api/nearby-hotels/route.ts
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
            // "places.photos",
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
    // console.log("nearby hotels:", data.places[0]);
    console.log("nearby hotels:", data.places);
    // console.log("nearby hotels:", data.places[0].location);
    // console.log("photos", data.places[0].photos);
    // console.log("photos", data.places[0].photos[0].authorAttributions);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching nearby hotels:", error);
    return NextResponse.json(
      { error: "Failed to fetch nearby hotels" },
      { status: 500 }
    );
  }
}
