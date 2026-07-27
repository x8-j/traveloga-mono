import "dotenv/config";

import connectDb from "./db/connect";
import destinationModel from "./models/destinations";
import data from "./data/data.json";

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI ?? "");
    await destinationModel.deleteMany();
    await destinationModel.create(data);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
