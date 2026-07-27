import Bookings from "../models/bookings";
import StatusCodes from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import { RequestHandler } from "express";

const getAllBookings: RequestHandler = async (req, res) => {
  const bookings = await Bookings.find({ bookedBy: req.user?.userId });
  res.status(StatusCodes.OK).json(bookings);
};

const getBooking: RequestHandler = async (req, res) => {
  const {
    user,
    params: { id },
  } = req;

  const bookings = await Bookings.findById({ _id: id, bookedBy: user?.userId });
  if (!bookings)
    throw new NotFoundError("This bookings does not currently exist");
  res.status(StatusCodes.OK).json(bookings);
};

const addInTheCart: RequestHandler = async (req, res) => {
  const {
    travellingFromLocation,
    regionsCategory,
    travellingFromRegion,
    travellingTo,
    dateOfLeave,
    dateOfReturn,
    withHotel,
    flightType,
    amount,
  } = req.body;

  if (
    !travellingFromLocation ||
    !regionsCategory ||
    !travellingFromRegion ||
    !travellingTo ||
    !dateOfLeave ||
    !dateOfReturn ||
    !withHotel ||
    !flightType ||
    !amount
  )
    throw new BadRequestError("Incomplete Info Sent!");
  req.body.bookedBy = req.user?.userId;
  await Bookings.create(req.body);
  res.status(StatusCodes.OK).json({ message: "Booking Successful!" });
};

const updateInfo: RequestHandler = async (req, res) => {
  const {
    body: { status },
    user,
    params: { id },
  } = req;

  if (!status)
    throw new BadRequestError(
      "Please specify the status you want to update to",
    );
  req.body.updatedAt = Date.now();
  const update = await Bookings.findByIdAndUpdate(
    { _id: id, bookedBy: user?.userId },
    req.body,
    { new: true, runValidators: true },
  );

  if (!update) throw new NotFoundError("This booking does not currently exist");
  const bookings = await Bookings.find({ bookedBy: user?.userId });
  res
    .status(StatusCodes.OK)
    .json({ bookings, message: "Successfully Updated" });
};

const deleteItem: RequestHandler = async (req, res) => {
  const {
    user,
    params: { id: bookingsId },
  } = req;

  const userId = user?.userId ?? "";
  if (!userId || !bookingsId) throw new BadRequestError("Bad Request Sent!");
  const update = await Bookings.findByIdAndDelete({
    _id: bookingsId,
    bookedBy: userId,
  });

  if (!update) throw new BadRequestError("Booking not found within the user");
  const bookings = await Bookings.find({ bookedBy: userId });

  res
    .status(StatusCodes.OK)
    .json({ bookings: bookings ?? null, message: "Successfully Deleted" });
};

export { getAllBookings, getBooking, addInTheCart, updateInfo, deleteItem };
