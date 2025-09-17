import { Router } from "express";
import { user } from "../controller/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(user.register);
router.route("/login").post(user.login);
router.route("/google-login").post(user.googleLogin);

// protected routes
router.route("/get-user").get(protect, user.getUser);
router.route("/logout").post(protect, user.logout);
router.route("/update-user").post(protect, user.updateUser);

export default router;
