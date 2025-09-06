import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

export const user = {
  register: asyncHandler(async (req, res) => {
    console.log(req.body);
    const { email, fullName, password } = req.body;
    if (!email || !password)
      throw new ApiError(400, "Email and password are required");

    const existedUser = await User.findOne({ where: { email } });
    if (existedUser)
      throw new ApiError(409, "User with this email already exists");

    const newUser = await User.create({
      email,
      fullName,
      password,
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      newUser.id
    );

    const safeUser = {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(new ApiResponse(201, safeUser, "User registered successfully"));
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ where: { email } });
    if (!user) throw new ApiError(404, "User does not exist");

    const isValid = await user.isPasswordCorrect(password);
    if (!isValid) throw new ApiError(401, "Invalid user credentials");

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user.id
    );

    const safeUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { user: safeUser, accessToken, refreshToken },
          "User logged in successfully"
        )
      );
  }),

  logout: asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) throw new ApiError(401, "Unauthorized");

    await User.update({ refreshToken: null }, { where: { id: userId } });

    return res
      .status(200)
      .clearCookie("accessToken", cookieOptions)
      .clearCookie("refreshToken", cookieOptions)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  }),

  getUser: asyncHandler(async (req, res) => {
    console.log(req.user);
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const currentUser = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "fullName", "avatar"],
    });

    if (!currentUser) throw new ApiError(404, "User not found");

    return res
      .status(200)
      .json(new ApiResponse(200, currentUser, "User fetched successfully"));
  }),

  refreshAccessToken: asyncHandler(async (req, res) => {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken)
      throw new ApiError(401, "Refresh token required");

    try {
      const decoded = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await User.findByPk(decoded.id);

      if (!user) throw new ApiError(401, "User not found");
      if (incomingRefreshToken !== user.refreshToken)
        throw new ApiError(401, "Refresh token is invalid or expired");

      // Generate new tokens
      const { accessToken, refreshToken } =
        await generateAccessAndRefreshTokens(user.id);

      return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
          new ApiResponse(
            200,
            { accessToken, refreshToken },
            "Tokens refreshed successfully"
          )
        );
    } catch (err) {
      throw new ApiError(401, err.message || "Invalid refresh token");
    }
  }),
};
