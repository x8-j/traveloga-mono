import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  travellingFromLocation: {
    type: String,
    required: [true, "Input the location you're travelling from."],
  },
  travellingFromRegion: {
    type: String,
    required: [true, "Please input the region you're travelling from."],
  },
  regionsCategory: {
    type: String,
    required: [true, "Please input the region of your selected destination."],
  },
  travellingTo: {
    type: String,
    required: [true, "Plase input the location of your selected destination."],
  },
  dateOfLeave: {
    type: Date,
    required: [true, "Plase input the date of your leave."],
  },
  dateOfReturn: {
    type: Date,
    required: [true, "Plase input the date of your leave."],
  },
  withHotel: {
    type: Boolean,
  },
  flightType: {
    type: String,
    required: [
      true,
      "Please choose which mode of flight to reach your destination",
    ],
    enum: ["domestic", "international"],
  },
  status: {
    type: String,
    enum: ["Cart", "Booked", "Cancelled", "Refunded"],
    default: "Cart",
  },
  amount: {
    type: Number,
    required: [true, "Please provide the amount of the booking"],
  },
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

export default mongoose.model("listOfBookings", bookingSchema);
