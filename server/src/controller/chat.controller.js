import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";

export const chat = {
  fetchAllChats: asyncHandler(async (req, res) => {
    const { id: userId } = req.user;

    console.log("fetching all chats for userId: ", userId);

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
};
