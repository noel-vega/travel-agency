"use client";
import PlacesAutocomplete from "@/components/PlacesAutoComplete";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useBookingsStore } from "@/stores/bookings";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

const formSchema = z.object({
  clientName: z.string().min(1),
  clientId: z.string().min(1),
  venue: z.object({
    name: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  checkIn: z.date({
    required_error: "A date of birth is required.",
  }),
  checkOut: z.date({
    required_error: "A date of birth is required.",
  }),
  roomType: z.union([
    z.literal("single"),
    z.literal("double"),
    z.literal("suite"),
  ]),
  roomCount: z.number().min(1),
  budget: z.number().min(1),
  specialRequests: z.string(),
});

export function CreateBookingForm() {
  const router = useRouter();
  const { addBooking } = useBookingsStore();
  const form = useForm({
    validators: {
      onMount: formSchema,
      onChange: formSchema,
    },
    defaultValues: {
      clientId: nanoid(),
      checkIn: null!!,
      checkOut: null!!,
      clientName: "",
      roomCount: 1,
      roomType: null!!,
      venue: null!!,
      budget: 0,
      specialRequests: "",
    },
    onSubmit: ({ value }) => {
      addBooking(value);
      router.push("/bookings");
    },
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="clientName">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="client-name">Client Name</Label>
            <Input
              id="client-name"
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="budget">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="budget">Budget</Label>
            <Input
              id="budget"
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="venue">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="venue">Venue</Label>
            <PlacesAutocomplete
              id="venue"
              // onPlaceSelect={handlePlaceSelect}
              placeholder="Enter a location..."
              onChange={(place) => {
                field.handleChange({
                  address: place.formattedAddress,
                  name: place.displayName.text,
                  ...place.location,
                });
              }}
            />
          </div>
        )}
      </form.Field>

      <div className="flex gap-4">
        <form.Field name="checkIn">
          {(field) => (
            <div className="flex flex-col space-y-2 flex-1">
              <Label>Check In</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.state.value && "text-muted-foreground"
                    )}
                  >
                    {field.state.value ? (
                      format(field.state.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    className="w-full"
                    mode="single"
                    selected={field.state.value}
                    onSelect={(date) => {
                      if (!date) return;
                      field.handleChange(date);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </form.Field>

        <form.Field name="checkOut">
          {(field) => (
            <div className="flex flex-col space-y-2 flex-1">
              <Label>Check Out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.state.value && "text-muted-foreground"
                    )}
                  >
                    {field.state.value ? (
                      format(field.state.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    className="w-full"
                    mode="single"
                    selected={field.state.value}
                    onSelect={(date) => {
                      if (!date) return;
                      field.handleChange(date);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="roomType">
        {(field) => (
          <div className="space-y-2">
            <Label id="room-type">Room Type</Label>
            <Select
              onValueChange={(value: "single" | "double" | "suite") => {
                field.handleChange(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select room type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="double">Double</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </form.Field>

      <form.Field name="roomCount">
        {(field) => (
          <div className="space-y-2">
            <Label>Number of rooms</Label>
            <Input
              type="number"
              step={1}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.valueAsNumber)}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="specialRequests">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor="special-requests">Special Requests</Label>
            <Textarea
              onChange={(e) => field.handleChange(e.target.value)}
              rows={10}
            />
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Submit"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
