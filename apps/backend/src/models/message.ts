import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    minlength: 2,
    maxlength: 15,
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    unique: true,
  },
  message: {
    type: String,
    required: [true, "Please provide your message"],
    minLength: 2,
    maxLength: 500,
  },
});

export default mongoose.model("Subscription", messageSchema);
