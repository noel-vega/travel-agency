import { HotelSchema, Location } from "@/types/hotels";
import { useMutation } from "@tanstack/react-query";

async function getNearbyHotels(location: Location) {
  const response = await fetch("/api/nearby-hotels", {
    method: "post",
    body: JSON.stringify({
      latitude: location.latitude,
      longitude: location.longitude,
      radiusMiles: 20,
    }),
  });

  const data = await response.json();
  console.log(data);

  const hotels = HotelSchema.array().parse(data);
  console.log("hotels", hotels);
  return hotels;
}

export function useNearbyHotels() {
  return useMutation({
    mutationFn: getNearbyHotels,
  });
}
