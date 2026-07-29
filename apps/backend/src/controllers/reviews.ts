import { RequestHandler } from "express";

const getAllReviews: RequestHandler = async (req, res) => {
  console.log("All reviews gotten");
};

const createReview: RequestHandler = async (req, res) => {
  console.log("Review created!");
};

//Admin Options

const getReview: RequestHandler = async (req, res) => {
  console.log("Review Gotten");
};

const deleteReview: RequestHandler = async (req, res) => {
  console.log("Review deleted!");
};

const updateReview: RequestHandler = async (req, res) => {
  console.log("Review updated");
};

export { getAllReviews, createReview, getReview, deleteReview, updateReview };
