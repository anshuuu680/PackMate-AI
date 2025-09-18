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
      attributes: [
        "id",
        "title",
        "createdAt",
        "updatedAt",
        //  formatted field
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("Chat.createdAt"),
            "%W, %d %M, %Y"
          ),
          "createdAtFormatted",
        ],
      ],
      include: [
        {
          model: Message,
          as: "lastMessage",
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

  fetchChat: asyncHandler(async (req, res) => {
    const { id: userId } = req.user;
    const { chatId } = req.params;

    if (!userId) throw new ApiError(400, "userId is required");
    if (!chatId) throw new ApiError(400, "chatId is required");

    const user = await User.findByPk(userId);
    if (!user) throw new ApiError(404, "User not found");

    const chat = await Chat.findOne({
      where: { id: chatId, userId },
    });

    if (!chat) throw new ApiError(404, "Chat not found");

    const messages = await Message.findAll({
      where: { chatId: chat.id },
      order: [["createdAt", "ASC"]],
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { messages: messages, chat: chat },
          "Chat messages fetched"
        )
      );
  }),

  deleteChat: asyncHandler(async (req, res) => {
    const { id: userId } = req.user;
    const { chatId } = req.params;

    if (!userId) throw new ApiError(400, "userId is required");
    if (!chatId) throw new ApiError(400, "chatId is required");

    const user = await User.findByPk(userId);
    if (!user) throw new ApiError(404, "User not found");

    const chat = await Chat.findOne({
      where: { id: chatId, userId },
    });

    if (!chat) throw new ApiError(404, "Chat not found");

    await chat.destroy();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Chat deleted successfully"));
  }),
};
