import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UsersIcon, BuildingIcon, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Booking } from "@/types/bookings";

type Props = {
  booking: Booking;
};

export function BookingDetailsSheet({ booking }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Booking Details</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Booking Request Details</SheetTitle>
        </SheetHeader>

        {/* Booking Details Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
              New Request
            </span>
          </div>

          <div className="space-y-4">
            {/* Client & Venue */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <UsersIcon className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-500">Client</h3>
              </div>
              <p className="font-medium">The Rolling Stones</p>
              <p className="text-sm text-gray-600">World Tour 2025</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <BuildingIcon className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-500">Venue</h3>
              </div>
              {/* <p className="font-medium">Madison Square Garden</p> */}
              <p className="font-medium text-sm">{booking.venue.address}</p>
              <p className="text-sm text-gray-600">New York, NY 10001</p>
            </div>

            {/* Dates & Requirements */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-500">
                  Stay Details
                </h3>
              </div>
              <div className="flex mb-1">
                <div className="text-sm flex-1">
                  <p>Check in:</p>
                  <p>{format(booking.checkIn, "MMMM do yyyy")}</p>
                </div>
                <div className="text-sm flex-1">
                  <p>Check out:</p>
                  <p>{format(booking.checkOut, "MMMM do yyyy")}</p>
                </div>
              </div>

              <p className="text-xs text-gray-600">
                2 nights, Check-in after 2 PM
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <UsersIcon className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-500">
                  Room Requirements
                </h3>
              </div>
              <p className="font-medium">{booking.roomCount} Rooms Total</p>
              <p className="text-sm text-gray-600">Type: {booking.roomType}</p>
              {/* <p className="text-sm text-gray-600">10 Standard, 2 Suites</p> */}
              {/* <p className="text-sm text-gray-600">10 Standard, 2 Suites</p> */}
            </div>

            {/* Special Requirements */}
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Special Requirements
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tour bus parking required (minimum 2 spaces)</li>
                <li>• Late check-out needed (4 PM)</li>
                <li>• Ground floor rooms preferred</li>
              </ul>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
