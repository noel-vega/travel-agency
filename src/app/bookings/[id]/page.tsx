"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookingsStore } from "@/stores/bookings";
import { Hotel } from "@/types/hotels";
import { MoveLeftIcon, SquareArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { bookings } = useBookingsStore();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const params = useParams();
  const booking = bookings.find((x) => x.id === params.id);

  useEffect(() => {
    if (!booking) return;
    fetch("/api/nearby-hotels", {
      method: "post",
      body: JSON.stringify({
        latitude: booking.venue.latitude,
        longitude: booking.venue.longitude,
        radiusMiles: 20,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setHotels(data.places);
      });
  }, [booking]);

  if (!booking) {
    return <div>Booking does not exist</div>;
  }

  return (
    <div>
      <Button variant="outline" asChild>
        <Link href="/bookings">
          <MoveLeftIcon />
        </Link>
      </Button>

      <div>
        <p className="">Budget: ${booking.budget}</p>
        <p className="">Rooms: {booking.roomCount}</p>
        <p className="">Room Type: {booking.roomType}</p>
        <p className="">Venue: {booking.venue.address}</p>
        {booking.specialRequests && (
          <p>Special Requests: {booking.specialRequests}</p>
        )}
      </div>
      <ul className="flex flex-col gap-6">
        {hotels.map((hotel) => (
          <li
            key={hotel.id}
            className="flex max-w-[500px] w-full border rounded-lg"
          >
            <Skeleton className="h-32 w-52 shrink-0" />
            <div className="p-2 pl-4 space-y-2">
              <p className="font-semibold">{hotel.displayName.text}</p>
              <div className="text-xs space-y-1">
                <p className="text-xs">{hotel.formattedAddress}</p>
                <p>Rating: {hotel.rating}</p>
                {hotel?.websiteUri && (
                  <Link
                    href={hotel.websiteUri}
                    target="_blank"
                    className="flex gap-1.5 items-center w-fit"
                  >
                    <p className="text-blue-500 hover:underline">Website</p>
                    <SquareArrowUpRightIcon size={10} />
                  </Link>
                )}
              </div>

              {/* <p>Pricing: {hotel.priceLevel}</p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
