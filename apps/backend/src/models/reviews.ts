import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  message: {
    type: String,
    minLength: [5, "Please add more characters."],
    maxlength: [100, "Please lessen the characters."],
    required: [true, "Please input your review."],
  },
  rating: {
    required: [true, "Please drop a rating for your overall experience."],
    default: 5,
    enum: [1, 2, 3, 4, 5],
  },
});

export default mongoose.model("Reviews", reviewSchema);
