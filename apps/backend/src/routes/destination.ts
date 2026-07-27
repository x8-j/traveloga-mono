import { Router } from "express";
const router: Router = Router();
import { getAllDestinations, getDestination } from "../controllers/destination";

router.route("/").get(getAllDestinations);
router.route("/:id").get(getDestination);

export default router;
