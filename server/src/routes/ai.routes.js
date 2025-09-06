import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { ai } from "../controller/ai.controller.js";

const router = Router();

// protected routes
router.route("/chat").post(protect, ai.getData);

export default router;
