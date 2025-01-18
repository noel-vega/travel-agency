"use client";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { Booking, BookingStatus } from "@/types/bookings";

// types/booking.ts

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
