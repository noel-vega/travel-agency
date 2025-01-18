"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";
import { CreateBookingForm } from "./create-booking-form";

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="flex gap-4 items-center">
        <Button asChild variant="outline" size="sm">
          <Link href="/bookings">
            <MoveLeftIcon />
          </Link>
        </Button>
        <p className="text-xs">Booking requests</p>
      </div>

      <h1 className="font-semibold text-3xl ">Create Booking Request</h1>
      <div className="max-w-lg">
        <CreateBookingForm />
      </div>
    </div>
  );
}
