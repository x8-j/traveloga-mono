import { Router } from "express";
const router: Router = Router();
import { getUser, updateUser } from "../controllers/users";

router.route("/").get(getUser);
router.route("/").patch(updateUser);

export default router;
