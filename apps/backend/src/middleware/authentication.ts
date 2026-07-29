import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors";
import { RequestHandler } from "express";

const auth: RequestHandler = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalids");
  }
  const token = authHeader.split(" ")[1] ?? "";

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? "");
    if (typeof payload === "string") return;
    req.user = { userId: payload.userId, password: payload.password };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Authentication invalid");
  }
};

export default auth;
