"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookingsStore } from "@/stores/bookings";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLinkIcon, MapPinIcon, MoveLeftIcon } from "lucide-react";
import { BookingDetailsSheet } from "../components/booking-details-sheet";
import { useEffect, useState } from "react";
import { Hotel } from "@/types/hotels";
import { HotelCard } from "../components/hotel-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  calculateDistance,
  cn,
  formatDistance,
  ratingFormatter,
} from "@/lib/utils";
import { StarRating } from "@/components/star-rating-component";
import { useNearbyHotels } from "../hooks/useNearbyHotels";
import { Skeleton } from "@/components/ui/skeleton";
import EmptySelectedHotels from "../components/empty-selected-hotels";

export default function Page() {
  const { bookings } = useBookingsStore();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [focusedHotel, setFocusedHotel] = useState<Hotel>();
  const [selectedHotels, setSelectedHotels] = useState<Hotel[]>([]);
  const params = useParams();
  const booking = bookings.find((x) => x.id === params.id);
  const nearByHotelsMutation = useNearbyHotels();

  useEffect(() => {
    if (!booking) return;
    nearByHotelsMutation.mutate(booking.venue, {
      onSuccess: (hotels) => {
        setHotels(hotels);

        if (hotels.length > 0) {
          setFocusedHotel(hotels[0]);
        }
      },
      onError: (error) => {
        console.error(error.message);
      },
    });
  }, [booking, hotels]);

  const handleAddToSelection = (hotel: Hotel) => {
    setSelectedHotels((prev) => [hotel, ...prev]);
  };

  const handleRemoveSelection = (hotel: Hotel) => {
    setSelectedHotels((prev) => prev.filter((x) => x.id !== hotel.id));
  };

  if (!booking) {
    return <div>Booking does not exist</div>;
  }

  return (
    <div>
      <header className="border-b space-y-4 pb-4 mb-8">
        <div className="flex gap-8 items-center">
          <Button variant="outline" asChild>
            <Link href="/bookings">
              <MoveLeftIcon />
            </Link>
          </Button>
          <h1 className="text-2xl font-semibold">Booking Request Planner</h1>
          <div className="ml-auto">
            <BookingDetailsSheet booking={booking} />
          </div>
        </div>

        {/* <div>Finding Hotels</div>
        <div>Quote Processing</div>
        <div>Confirmed</div> */}
      </header>

      <Tabs
        defaultValue={selectedHotels.length === 0 ? "search" : "selected"}
        className="w-full space-y-6"
      >
        <TabsList>
          <TabsTrigger value="selected">Selected Hotels</TabsTrigger>
          <TabsTrigger value="search">Search Hotels</TabsTrigger>
        </TabsList>
        <TabsContent value="selected">
          {selectedHotels.length === 0 ? (
            <EmptySelectedHotels />
          ) : (
            <ul className="space-y-6">
              {selectedHotels.map((hotel) => (
                <HotelCard key={hotel.id} from={booking.venue} hotel={hotel} />
              ))}
            </ul>
          )}
        </TabsContent>
        <TabsContent value="search" className="flex gap-10">
          {nearByHotelsMutation.isPending ? (
            <>
              <div className="flex-1">
                <ul className="flex flex-col gap-6">
                  {new Array(20).fill(null).map((hotel, index) => (
                    <li key={index}>
                      <Skeleton className="w-full h-32" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 sticky top-10">
                <Skeleton className="h-96 w-full" />
              </div>
            </>
          ) : (
            <>
              <div className="flex-1">
                <ul className="flex flex-col gap-6">
                  {hotels.map((hotel) => (
                    <li key={hotel.id}>
                      <HotelCard
                        from={booking.venue}
                        hotel={hotel}
                        onClick={() => setFocusedHotel(hotel)}
                        className={cn(
                          "cursor-pointer shadow-none hover:shadow w-full",
                          {
                            "border-green-500": selectedHotels.find(
                              (x) => x.id === hotel.id
                            ),
                            "border-blue-500": hotel.id === focusedHotel?.id,
                          }
                        )}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 sticky top-10">
                {focusedHotel && (
                  <Card className="sticky top-10">
                    <CardHeader className="border-b space-y-2">
                      <div>
                        <CardTitle className="text-3xl">
                          {focusedHotel.displayName.text}
                        </CardTitle>
                        <CardDescription className="text-lg flex items-center gap-1.5">
                          <MapPinIcon size={16} />{" "}
                          <span>{focusedHotel.formattedAddress}</span>
                        </CardDescription>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span>{focusedHotel.rating}</span>
                        <StarRating rating={focusedHotel.rating} size={15} />
                        <span>
                          (
                          {ratingFormatter.format(focusedHotel.userRatingCount)}
                          )
                        </span>
                      </div>

                      <p>
                        {formatDistance(
                          calculateDistance({
                            from: booking.venue,
                            to: focusedHotel.location,
                          })
                        )}{" "}
                        away from venue
                      </p>

                      <div className="flex items-center gap-2">
                        {selectedHotels.find(
                          (x) => x.id === focusedHotel.id
                        ) ? (
                          <Button
                            className="w-fit transition-none"
                            variant="destructive"
                            onClick={() => handleRemoveSelection(focusedHotel)}
                          >
                            Remove from Selection
                          </Button>
                        ) : (
                          <Button
                            className="w-fit transition-none"
                            onClick={() => handleAddToSelection(focusedHotel)}
                          >
                            Add to Selection
                          </Button>
                        )}
                        {focusedHotel?.websiteUri && (
                          <Button variant="secondary" asChild>
                            <Link
                              href={focusedHotel.websiteUri}
                              target="_blank"
                            >
                              <ExternalLinkIcon />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>Todo: Add hours open</div>
                      <div>Todo: Add amenities here</div>
                      <div>Todo: Add map with directions from the venue </div>
                      {/* {focusedHotel.regularOpeningHours} */}
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
