import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import sequelize from "../config/db.js";

export const chat = {
  fetchAllChats: asyncHandler(async (req, res) => {
    const { id: userId } = req.user;

    if (!userId) {
      throw new ApiError(400, "userId is required");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const chats = await Chat.findAll({
      where: { userId },
      attributes: ["id", "title", "createdAt", "updatedAt"],
      include: [
        {
          model: Message,
          limit: 1,
          separate: true,
          order: [["createdAt", "DESC"]],
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          chats,
          chats.length ? "User chats" : "No chats found"
        )
      );
  }),

  receiveMessage: asyncHandler(async (req, res) => {
    const { message: userMessage } = req.body;
    const { id: userId } = req.user;

    if (!userId) {
      throw new ApiError(400, "userId is required");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Transaction: create chat + first message
    const result = await sequelize.transaction(async (t) => {
      const chat = await Chat.create(
        { userId, title: "New Chat" },
        { transaction: t }
      );

      const message = await Message.create(
        { chatId: chat.id, sender: userId, message: userMessage },
        { transaction: t }
      );

      return { chat, message };
    });

    return res
      .status(201)
      .json(new ApiResponse(201, result.chat, "New chat created"));
  }),
};
