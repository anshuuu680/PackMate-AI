import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { chat } from "../controller/chat.controller.js";

const router = Router();

// protected routes
router.route("/all-chats").get(protect, chat.fetchAllChats);
router.route("/fetch-chat/:chatId").get(protect, chat.fetchChat);
router.route("/delete-chat/:chatId").delete(protect, chat.deleteChat);

export default router;
