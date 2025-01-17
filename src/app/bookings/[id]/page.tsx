"use client";
import { Button } from "@/components/ui/button";
import { MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  return (
    <div>
      <Button variant="outline" asChild>
        <Link href="/bookings">
          <MoveLeftIcon />
        </Link>
      </Button>
      Booking: {params.id}
    </div>
  );
}
