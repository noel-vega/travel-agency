"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeftIcon } from "lucide-react";
import { CreateBookingForm } from "./create-booking-form";

export default function Page() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="outline">
          <Link href="/bookings">
            <MoveLeftIcon />
          </Link>
        </Button>
        <h1 className="font-semibold text-3xl ">Create Booking</h1>
      </div>
      <div className="max-w-lg">
        <CreateBookingForm />
      </div>
    </div>
  );
}
