"use client";

import { DataTable } from "@/components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBookingsStore } from "@/stores/bookings";

export default function Page() {
  const { bookings } = useBookingsStore();
  const router = useRouter();
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Bookings</h1>
      <div className="flex items-end mb-4">
        <div className="max-w-xs w-full">
          <Label htmlFor="search-clients">Search</Label>
          <Input id="search-clients" className="w-full" />
        </div>
        <Button className="ml-auto" asChild>
          <Link href="/bookings/create">Create Booking</Link>
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={bookings}
        rowCursorPointer
        onRowClick={({ id }) => {
          router.push(`/bookings/${id}`);
        }}
      />
    </div>
  );
}

type Booking = {
  id: string;
  clientId: string;
  venue: {
    address: string;
    latitude: number;
    longitude: number;
  };
  checkIn: Date;
  checkOut: Date;
  roomType: "single" | "double" | "suite";
  roomCount: number;
  budget: number;
  specialRequests: string;
};

const columns: ColumnDef<Booking>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "venue",
    header: "Venue",
    cell: ({ row }) => row.original.venue.address,
  },
  {
    accessorKey: "roomType",
    header: "Type",
  },
  {
    accessorKey: "roomCount",
    header: "Rooms",
  },
  {
    accessorKey: "budget",
    header: "Budget",
  },
];
