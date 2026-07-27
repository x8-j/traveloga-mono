import { RequestHandler } from "express";
import Message from "../models/message";
import { StatusCodes } from "http-status-codes";

// const { BadRequestError, NotFoundError } = require("../errors");

//Admin options
// const getAllMessages = async (req, res) => {
//     const messages = await Message.find(req)
//     res.status(StatusCodes.OK).json(messages)
// }

// const getMessage = async (req, res) => {
//     const {id} = req.params
//     const messages = await Message.findOne({_id: id})
//     if (!messages) throw new NotFoundError("Message is not found.")
//     res.status(StatusCodes.OK).json(messages)
// }

const createMessage: RequestHandler = async (req, res) => {
  const messages = await Message.create({ ...req.body });
  res.status(StatusCodes.CREATED).json("Message created.");
};

// const updateMessage = async (req, res) => {
//     const {
//         body: {name, subject, email, message},
//         params: {id}
//     } = req
//     if (!name||!subject||!email||!message) throw new BadRequestError("Field/s are missing.")

//     const messages = await Message.findByIdAndUpdate(
//         {_id: id},
//         req.body,
//         { new: true, runValidators: true }
//     )
//     if (!messages) throw new NotFoundError("This message does not currently exist.")

//     res.status(StatusCodes.OK).json({msg: "Message Updated."})
// }

// const deleteMessage = async (req, res) => {
//     const {id} = req.params
//     const messages = await Message.findByIdAndDelete({_id: id})
//     if (!messages) throw new NotFoundError("This message does not currently exist.")
//     res.status(StatusCodes.OK).json({msg: "Message deleted"})
// }

export { createMessage };
