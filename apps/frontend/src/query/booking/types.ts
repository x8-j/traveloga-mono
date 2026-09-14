import { z } from 'zod';

export const BookingSchema = z.object({
  _id: z.string(),
  status: z.string(),
  amount: z.number(),
  travellingTo: z.string(),
  travellingFromLocation: z.string(),
  travellingFromRegion: z.string(),
  regionsCategory: z.string(),
  flightType: z.string(),
  dateOfLeave: z.string(),
  dateOfReturn: z.string(),
  withHotel: z.boolean(),
});

export const BookingSchemaPayload = BookingSchema.omit({
  _id: true,
}).partial();

export const ArrayOfBookingSchema = BookingSchema.array();

export type Booking = z.infer<typeof BookingSchema>;
export type BookingPayload = z.infer<typeof BookingSchemaPayload>;
