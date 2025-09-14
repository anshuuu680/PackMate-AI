import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ValidationService from "../services/validation.service.js";
import Wardrobe from "../models/wardrobe.model.js";

export const wardrobe = {
  addWardrobeItem: asyncHandler(async (req, res) => {
    const { error, value } = ValidationService.validateWardrobeItem(req.body);
    const { id: userId } = req.user;

    if (error) {
      throw new ApiError(400, "Validation failed", error);
    }
    if (!userId) {
      throw new ApiError(400, "userId is required");
    }

    const { name, category, isFavorite, image } = value;

    const item = await Wardrobe.create({
      userId,
      name,
      category,
      isFavorite,
      image,
    });

    await item.save();

    return res
      .status(201)
      .json(new ApiResponse(201, item, "Wardrobe item added"));
  }),

  getWardrobe: asyncHandler(async (req, res) => {
    const { id: userId } = req.user;

    if (!userId) {
      throw new ApiError(400, "userId is required");
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const items = await Wardrobe.findAll({ where: { userId } });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          items,
          items.length ? "User wardrobe items" : "No wardrobe items found"
        )
      );
  }),

  toggleFavorite: asyncHandler(async (req, res) => {
    const { id: userId } = req.user;
    const { id } = req.params;

    if (!userId) {
      throw new ApiError(400, "userId is required");
    }

    const item = await Wardrobe.findOne({ where: { id, userId } });
    if (!item) {
      throw new ApiError(404, "Wardrobe item not found");
    }

    item.isFavorite = !item.isFavorite;
    await item.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          item,
          item.isFavorite
            ? "Item marked as favorite"
            : "Item removed from favorites"
        )
      );
  }),
};
