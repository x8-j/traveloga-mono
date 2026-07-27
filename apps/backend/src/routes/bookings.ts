import { Router } from "express";
const router: Router = Router();

import {
  getAllBookings,
  getBooking,
  addInTheCart,
  updateInfo,
  deleteItem,
} from "../controllers/bookings";

router.route("/").get(getAllBookings);
router
  .route("/:id")
  .get(getBooking)
  .post(addInTheCart)
  .patch(updateInfo)
  .delete(deleteItem);

export default router;
