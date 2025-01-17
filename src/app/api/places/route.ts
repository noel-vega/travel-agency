// app/api/places/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    const res = await fetch(
      `https://places.googleapis.com/v1/places:searchText`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY!,
          "X-Goog-FieldMask":
            "places.displayName,places.formattedAddress,places.id,places.location",
        },
        body: JSON.stringify({
          textQuery: input,
          languageCode: "en",
          maxResultCount: 5,
        }),
      }
    );

    const data = await res.json();
    console.log("search", data);
    console.log("search", data.places[0].location);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json(
      { error: "Failed to fetch places" },
      { status: 500 }
    );
  }
}
