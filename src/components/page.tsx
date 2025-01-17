// "use client";
// // app/page.tsx or any other component
// import PlacesAutocomplete from "@/components/PlacesAutoComplete";
// import type { Place } from "@/types/places";
// import type { Hotel } from "@/types/hotels";
// import { useState } from "react";
// import { useForm } from "@tanstack/react-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// const formSchema = z.object({
//   clientName: z.string().min(1),
//   venueLocation: z.object({
//     latitude: z.number(),
//     longitude: z.number(),
//   }),
//   checkIn: z.date({
//     required_error: "A date of birth is required.",
//   }),
//   checkOut: z.date({
//     required_error: "A date of birth is required.",
//   }),
//   roomType: z.union([
//     z.literal("single"),
//     z.literal("double"),
//     z.literal("suite"),
//   ]),
//   roomCount: z.number().min(1),
//   budget: z.number().min(1),
//   specialRequests: z.string(),
// });

// export default function Page() {
//   const form = useForm({
//     validators: {
//       onMount: formSchema,
//       onChange: formSchema,
//     },
//     defaultValues: {
//       checkIn: null!!,
//       checkOut: null!!,
//       clientName: "",
//       roomCount: 1,
//       roomType: null!!,
//       venueLocation: null!!,
//       budget: 0,
//       specialRequests: "",
//     },
//   });
//   const [hotels, setHotels] = useState<Hotel[]>([]);
//   const handlePlaceSelect = (place: Place) => {
//     console.log("Selected place:", place);
//     // Access typed place data
//     // fetch("/api/nearby-hotels", {
//     //   method: "post",
//     //   body: JSON.stringify({
//     //     ...place.location,
//     //     radiusMiles: 20,
//     //   }),
//     // })
//     //   .then((res) => res.json())
//     //   .then((data) => {
//     //     setHotels(data.places);
//     //   });
//     const { id, displayName, formattedAddress, location } = place;
//   };

//   return (
//     <div>
//       <form>
//         <form.Field name="clientName">
//           {(field) => (
//             <div>
//               <Label htmlFor="client-name">Client Name</Label>
//               <Input
//                 id="client-name"
//                 onChange={(e) => field.handleChange(e.target.value)}
//               />
//             </div>
//           )}
//         </form.Field>

//         <form.Field name="budget">
//           {(field) => (
//             <div>
//               <Label htmlFor="budget">Budget</Label>
//               <Input
//                 id="budget"
//                 type="number"
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.valueAsNumber)}
//               />
//             </div>
//           )}
//         </form.Field>

//         <form.Field name="venueLocation">
//           {(field) => (
//             <div>
//               <Label htmlFor="venue">Venue</Label>
//               <PlacesAutocomplete
//                 id="venue"
//                 onPlaceSelect={handlePlaceSelect}
//                 placeholder="Enter a location..."
//                 onChange={(place) => {
//                   field.handleChange(place.location);
//                 }}
//               />
//             </div>
//           )}
//         </form.Field>

//         <form.Field name="checkIn">
//           {(field) => (
//             <div className="flex flex-col">
//               <Label>Check In</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-[240px] pl-3 text-left font-normal",
//                       !field.state.value && "text-muted-foreground"
//                     )}
//                   >
//                     {field.state.value ? (
//                       format(field.state.value, "PPP")
//                     ) : (
//                       <span>Pick a date</span>
//                     )}
//                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   {/* <Calendar
//                     mode="single"
//                     selected={field.state.value}
//                     onSelect={(date) => {
//                       if (!date) return;
//                       field.handleChange(date);
//                     }}
//                     disabled={(date) => date < new Date()}
//                     initialFocus
//                   /> */}
//                 </PopoverContent>
//               </Popover>
//             </div>
//           )}
//         </form.Field>

//         <form.Field name="checkOut">
//           {(field) => (
//             <div className="flex flex-col">
//               <Label>Check Out</Label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-[240px] pl-3 text-left font-normal",
//                       !field.state.value && "text-muted-foreground"
//                     )}
//                   >
//                     {field.state.value ? (
//                       format(field.state.value, "PPP")
//                     ) : (
//                       <span>Pick a date</span>
//                     )}
//                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                   {/* <Calendar
//                     mode="single"
//                     selected={field.state.value}
//                     onSelect={(date) => {
//                       if (!date) return;
//                       field.handleChange(date);
//                     }}
//                     disabled={(date) => date < new Date()}
//                     initialFocus
//                   /> */}
//                 </PopoverContent>
//               </Popover>
//             </div>
//           )}
//         </form.Field>

//         <form.Field name="roomType">
//           {(field) => (
//             <div>
//               <Label id="room-type">Room Type</Label>
//               <Select
//                 onValueChange={(value: "single" | "double" | "suite") => {
//                   field.handleChange(value);
//                 }}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select room type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="single">Single</SelectItem>
//                   <SelectItem value="double">Double</SelectItem>
//                   <SelectItem value="suite">Suite</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           )}
//         </form.Field>

//         <form.Field name="roomCount">
//           {(field) => (
//             <div>
//               <Label>Number of rooms</Label>
//               <Input
//                 type="number"
//                 step={1}
//                 value={field.state.value}
//                 onChange={(e) => field.handleChange(e.target.valueAsNumber)}
//               />
//             </div>
//           )}
//         </form.Field>

//         <form.Field name="specialRequests">
//           {(field) => (
//             <div>
//               <Label htmlFor="special-requests">Special Requests</Label>
//               <Textarea onChange={(e) => field.handleChange(e.target.value)} />
//             </div>
//           )}
//         </form.Field>

//         <form.Subscribe
//           selector={(state) => [state.canSubmit, state.isSubmitting]}
//           children={([canSubmit, isSubmitting]) => (
//             <Button type="submit" disabled={!canSubmit}>
//               {isSubmitting ? "..." : "Submit"}
//             </Button>
//           )}
//         />
//       </form>

//       {hotels.map((hotel) => (
//         <div key={hotel.id}>{hotel.displayName.text}</div>
//       ))}
//     </div>
//   );
// }

// function Hotel() {
//   return <div></div>;
// }

// const FormSchema = z.object({});
