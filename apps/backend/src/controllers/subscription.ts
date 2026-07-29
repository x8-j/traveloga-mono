import { RequestHandler } from "express";
import Subscription from "../models/subscription";
import { StatusCodes } from "http-status-codes";
// import { BadRequestError, NotFoundError } = require("../errors");

//admin options
// const getAllSubscribers = async (req, res) =>{
//     const subscriber = await Subscription.find(req)
//     res.status(StatusCodes.OK).json(subscriber)
// }

// const getSubscriber = async (req, res) => {
//     const {id} = req.params
//     const subscriber = await Subscription.findOne({_id: id}, "email")
//     if (!subscriber) throw new NotFoundError("Subscriber not found")
//     res.status(StatusCodes.OK).json(subscriber)
// }

const createSubscriber: RequestHandler = async (req, res) => {
  await Subscription.create({ ...req.body });
  res.status(StatusCodes.CREATED).json("Subscription successful");
};

// const deleteSubscriber = async (req, res) => {
//     const {id} = req.params
//     await Subscription.findByIdAndDelete({_id: id})
//     if (!job) throw new NotFoundError("Subscriber does not currently exist")
//     res.status(StatusCodes.OK).json({msg: "Subscriber deleted."})
// }

// const updateSubscriber = async (req, res) => {
//     const {
//         body: {email},
//         params: {id}
//     } = req

//     if (!email) throw new BadRequestError("Email is required")

//     const subscriber = await Subscription.findByIdAndUpdate(
//         {_id: id},
//         req.body,
//         { new: true, runValidators: true }
//     )

//     if (!subscriber) throw new NotFoundError("Subscriber does not currently exist.")

//     res.status(StatusCodes.OK).json({subscriber})
// }

export { createSubscriber };
