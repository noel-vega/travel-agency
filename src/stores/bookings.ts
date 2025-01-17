"use client";
import { create } from "zustand";
import { nanoid } from "nanoid";

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

type State = {
  bookings: Booking[];
};

type Actions = {
  addBooking: (booking: Omit<Booking, "id">) => void;
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
        address: "21 Oak Terrace",
        latitude: 5,
        longitude: 5,
      },
    },
  ],
  addBooking: (booking) => {
    set((state) => {
      return { bookings: [{ id: nanoid(), ...booking }, ...state.bookings] };
    });
  },
}));
