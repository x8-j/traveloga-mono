import mongoose from "mongoose";

const connectDB = (url: string) => {
  console.log("DB_URI check:", JSON.stringify(url));
  return mongoose.connect(url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
};

export default connectDB;
