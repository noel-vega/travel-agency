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
