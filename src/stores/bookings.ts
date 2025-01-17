"use client";
import { create } from "zustand";
import { nanoid } from "nanoid";

// types/booking.ts

export const BookingStatus = {
  INQUIRY: "INQUIRY",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type BookingStatusType = keyof typeof BookingStatus;

export type Booking = {
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
  status: BookingStatusType;
};

type StatusConfig = {
  label: string;
  variant:
    | "inquiry"
    | "pendingApproval"
    | "confirmed"
    | "completed"
    | "cancelled";
};

export const bookingStatusConfig: Record<BookingStatusType, StatusConfig> = {
  INQUIRY: {
    label: "Inquiry",
    variant: "inquiry",
  },
  PENDING_APPROVAL: {
    label: "Pending Approval",
    variant: "pendingApproval",
  },
  CONFIRMED: {
    label: "Confirmed",
    variant: "confirmed",
  },
  COMPLETED: {
    label: "Completed",
    variant: "completed",
  },
  CANCELLED: {
    label: "Cancelled",
    variant: "cancelled",
  },
};

type State = {
  bookings: Booking[];
};

type Actions = {
  addBooking: (booking: Omit<Booking, "id" | "status">) => void;
};

type Store = State & Actions;

export const useBookingsStore = create<Store>((set) => ({
  bookings: [
    {
      id: nanoid(),
      budget: 5000,
      checkIn: new Date(),
      checkOut: new Date(),
      clientId: nanoid(),
      roomCount: 5,
      roomType: "suite",
      specialRequests: "",
      venue: {
        address: "600 Somerset Corporate Blvd, Bridgewater, NJ 08807, USA",
        latitude: 40.588147899999996,
        longitude: -74.6238943,
      },
      status: BookingStatus.CONFIRMED,
    },
  ],
  addBooking: (booking) => {
    set((state) => {
      return {
        bookings: [
          { id: nanoid(), status: BookingStatus.INQUIRY, ...booking },
          ...state.bookings,
        ],
      };
    });
  },
}));
