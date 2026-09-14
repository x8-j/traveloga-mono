import { z } from 'zod';

const RegionFees = z.object({
  travelIn: z.number(),
  travelOut: z.number(),
  hotelFeePerDay: z.number(),
  stayFeePerDay: z.number(),
});

export const DestinationSchema = z.object({
  _id: z.string(),
  title: z.string(),
  location: z.string(),
  image: z.url(),
  category: z.enum(['history', 'landmark', 'beach']),
  description: z.string(),
  limitedOffers: z.object({
    domestic: z.number(),
    international: z.number(),
  }),
  domestic: RegionFees.extend({
    availableRegions: z.string().array(),
  }).optional(),
  international: z
    .object({
      america: RegionFees,
      europe: RegionFees,
      asia: RegionFees,
      southeastAsia: RegionFees,
      oceania: RegionFees,
    })
    .optional(),
});

export const ArrayOfDestinationsSchema = DestinationSchema.array();

export type Destination = z.infer<typeof DestinationSchema>;
