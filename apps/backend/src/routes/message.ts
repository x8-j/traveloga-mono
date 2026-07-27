import { Router } from "express";
const router: Router = Router();
import { createMessage } from "../controllers/message";

router.route("/").post(createMessage);
// router.route("/:id").get(getMessage).patch(updateMessage).delete(deleteMessage)

export default router;
