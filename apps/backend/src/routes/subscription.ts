import { Router } from "express";
const router: Router = Router();
import { createSubscriber } from "../controllers/subscription";

router.route("/").post(createSubscriber);
// router.route("/:id").get(getSubscriber)

export default router;
