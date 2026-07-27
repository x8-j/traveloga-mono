import "dotenv/config";
import "express-async-errors";

import helmet from "helmet";
import cors from "cors";
// import xss from 'xss-clean'
import rateLimiter from "express-rate-limit";

import express from "express";
import path from "path";

const app = express();

import connectDB from "./db/connect";

//Router
import bookingsRouter from "./routes/bookings";
import destinationRouter from "./routes/destination";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import reviewRouter from "./routes/reviews";
import subscriptionRouter from "./routes/subscription";
import messageRouter from "./routes/message";

//MiddleWare
import authenticateUser from "./middleware/authentication";
//error handler
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

//app.set('trust proxy', 1);
//app.use(
//  rateLimiter({
//    windowMs: 15 * 60 * 1000, // 15 minutes
//    max: 100, // limit each IP to 100 requests per windowMs
//  })
//);
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: "https://traveloga.onrender.com",
  }),
);
// app.use(xss());

app.use("/", express.static(path.join(__dirname, "public")));

//Routes
app.use("/api/v1/bookings", authenticateUser, bookingsRouter);
app.use("/api/v1/destinations", destinationRouter);
app.use("/api/v1/users", authenticateUser, usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/message", messageRouter);

//Middleware error handler
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI ?? "");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (err) {
    console.log(err);
  }
};

start();
