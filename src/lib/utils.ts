import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ratingFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
});
export const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export type LatLon = {
  latitude: number;
  longitude: number;
};
export function calculateDistance({ from, to }: { from: LatLon; to: LatLon }) {
  const R = 3959; // Earth's radius in miles (instead of 6371 for kilometers)

  const dLat = toRadians(to.latitude - from.latitude);
  const dLon = toRadians(to.latitude - from.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(from.latitude)) *
      Math.cos(toRadians(to.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in miles

  return distance;
}

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

// Helper function to format the distance nicely
export const formatDistance = (distanceInMiles: number) => {
  if (distanceInMiles < 0.1) {
    // If less than 0.1 miles, show in feet
    const feet = Math.round(distanceInMiles * 5280);
    return `${feet}ft`;
  } else {
    // If more than 0.1 miles, show with 1 decimal place
    return `${distanceInMiles.toFixed(1)} mi`;
  }
};
