import Destination from "../models/destinations";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors";
import { RequestHandler } from "express";

const getAllDestinations: RequestHandler = async (req, res) => {
  const { showCase, limitedOffers } = req.query;

  if (showCase) {
    const destinations = await Destination.find(
      { showCase },
      "title location image _id",
    );
    if (!destinations) {
      throw new NotFoundError("There is no destination with this showcase");
    }
    res.status(StatusCodes.OK).json({ destinations });
  }
  if (limitedOffers) {
    const destinations = await Destination.find(
      {
        "limitedOffers.domestic": { $gt: 0 },
        "limitedOffers.international": { $gt: 0 },
      },
      "image title location description limitedOffers _id",
    );
    if (!destinations) {
      throw new NotFoundError(
        "There is no destination with this limited offer",
      );
    }
    res.status(StatusCodes.OK).json(destinations);
  }

  const all = await Destination.find();
  return res.status(StatusCodes.OK).json(all);
};

const getDestination: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const destination = await Destination.findOne({ _id: id });
  res.status(StatusCodes.OK).json({ destination });
};

export { getAllDestinations, getDestination };
