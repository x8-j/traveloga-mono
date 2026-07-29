import { Router } from "express";
const router: Router = Router();
import {
  getAllReviews,
  createReview,
  getReview,
  deleteReview,
  updateReview,
} from "../controllers/reviews";

router.route("/").get(getAllReviews);
router
  .route("/:id")
  .get(getReview)
  .post(createReview)
  .patch(updateReview)
  .delete(deleteReview);

export default router;
