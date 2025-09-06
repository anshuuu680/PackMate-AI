import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import groq from "../config/groq.config.js";
import { getChatCompletion } from "../services/groqChat.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new ApiError(404, "User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

export const ai = {
  getData: asyncHandler(async (req, res) => {
    const { input } = req.body;
    try {
      const response = await getChatCompletion(input);
      return res
        .status(201)
        .json(new ApiResponse(201, response, "ai response"));
    } catch (error) {
      console.error("Groq Chat Error:", error);
      throw error;
    }
  }),
};
