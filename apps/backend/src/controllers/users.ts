import Users from "../models/users";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors";
import { RequestHandler } from "express";

const getUser: RequestHandler = async (req, res) => {
  const userId = req.user?.userId ?? "";
  const user = await Users.findOne({ _id: userId });
  if (!user) throw new BadRequestError("There seems to be an error");
  res.status(StatusCodes.OK).json({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  });
};

const updateUser: RequestHandler = async (req, res) => {
  const {
    body: { firstname, lastname, email, password, currentPassword },
    user,
    params: { id },
  } = req;

  const userPassword = user?.password;
  const userId = user?.userId;

  if (!firstname && !lastname && !email && !password && !currentPassword)
    throw new BadRequestError("Input the necessary details to update email.");
  if (!currentPassword)
    throw new BadRequestError("Please provide your current password.");
  if (id !== userId) throw new UnauthenticatedError("Invalid Credentials.");
  const updateUser = await Users.findByIdAndUpdate(
    { _id: id, password: userPassword },
    req.body,
    { new: true, runValidators: true },
  );
  if (!updateUser)
    throw new NotFoundError("This user does not currently exist");
  res.status(StatusCodes.OK).json({
    message: "Update Successful",
  });
};

export { getUser, updateUser };
