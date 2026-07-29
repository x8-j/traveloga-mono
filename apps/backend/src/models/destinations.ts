import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide the destination title"],
  },
  category: { type: String, required: [true, "Please provide the category"] },
  location: { type: String, required: [true, "Please provide the location"] },
  image: { type: String, required: [true, "Please provide the image"] },
  description: {
    type: String,
    required: [true, "Please provide the description"],
    minlength: 10,
    maxlength: 500,
  },
  showCase: { type: Array },
  limitedOffers: {
    domestic: { type: Number, default: 0 },
    international: { type: Number, default: 0 },
  },
  domestic: {
    availableRegions: {
      type: Array,
      default: ["Luzon", "Visayas", "Mindanao"],
    },
    travelIn: { type: Number, default: 3000 },
    travelOut: { type: Number, default: 3000 },
    hotelFeePerDay: { type: Number, default: 3500 },
    stayFeePerDay: { type: Number, default: 700 },
  },
  international: {
    america: {
      travelIn: { type: Number, default: 62000 },
      travelOut: { type: Number, default: 62000 },
      hotelFeePerDay: { type: Number, default: 5500 },
      stayFeePerDay: { type: Number, default: 1700 },
    },
    europe: {
      travelIn: { type: Number, default: 46000 },
      travelOut: { type: Number, default: 46000 },
      hotelFeePerDay: { type: Number, default: 5500 },
      stayFeePerDay: { type: Number, default: 1700 },
    },
    asia: {
      travelIn: { type: Number, default: 21000 },
      travelOut: { type: Number, default: 21000 },
      hotelFeePerDay: { type: Number, default: 5500 },
      stayFeePerDay: { type: Number, default: 1700 },
    },
    southeastAsia: {
      travelIn: { type: Number, default: 12000 },
      travelOut: { type: Number, default: 12000 },
      hotelFeePerDay: { type: Number, default: 5500 },
      stayFeePerDay: { type: Number, default: 1700 },
    },
    oceania: {
      travelIn: { type: Number, default: 24000 },
      travelOut: { type: Number, default: 24000 },
      hotelFeePerDay: { type: Number, default: 5500 },
      stayFeePerDay: { type: Number, default: 1700 },
    },
  },
});

export default mongoose.model("Destination", destinationSchema);
