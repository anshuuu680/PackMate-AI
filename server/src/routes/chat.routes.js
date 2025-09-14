import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { chat } from "../controller/chat.controller.js";

const router = Router();

// protected routes
router.route("/all-chats").get(protect, chat.fetchAllChats);
router.route("/receive-message").post(protect, chat.receiveMessage);

export default router;
