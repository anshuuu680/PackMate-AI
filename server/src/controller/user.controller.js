import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { verifyEmail } from "../emails/verify.email.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

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
      mobile: newUser.mobile,
      avatar: newUser.avatar,
      isVerified: newUser.isVerified,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          201,
          { user: safeUser, accessToken, refreshToken },
          "User registered successfully"
        )
      );
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
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
      mobile: user.mobile,
      avatar: user.avatar,
      isVerified: user.isVerified,
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

  googleLogin: asyncHandler(async (req, res) => {
    console.log("Google login request body:", req.body);
    const { token } = req.body;
    if (!token) throw new ApiError(400, "Google token is required");

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Check if user exists
    let existingUser = await User.findOne({ where: { email: payload.email } });

    if (!existingUser) {
      // Create user if not exists
      existingUser = await User.create({
        email: payload.email,
        fullName: payload.name,
        avatar: payload.picture,
        password: Math.random().toString(36).slice(-8), // random password for record
      });
    }

    // Generate JWT tokens
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      existingUser.id
    );

    const safeUser = {
      id: existingUser.id,
      email: existingUser.email,
      fullName: existingUser.fullName,
      avatar: existingUser.avatar,
    };

    console.log("Google login successful for user:", safeUser.email);

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { user: safeUser, accessToken, refreshToken },
          "Logged in with Google successfully"
        )
      );
  }),

  verifyEmail: asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) throw new ApiError(400, "Email is required");

    const user = await User.findOne({ where: { email } });
    if (!user) throw new ApiError(404, "User not found");

    const otp = generateOTP();

    await user.hashOtp(otp);
    await user.save();

    await verifyEmail(user.email, otp);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { email: user.email },
          "OTP sent to your email successfully"
        )
      );
  }),

  verifyOtp: asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) throw new ApiError(400, "Email and OTP are required");

    const user = await User.findOne({ where: { email } });
    if (!user) throw new ApiError(404, "User not found");

    if (!user.otpExpires || user.otpExpires < new Date()) {
      throw new ApiError(400, "OTP has expired. Please request a new one.");
    }

    const isValidOtp = await user.isOtpCorrect(otp);
    if (!isValidOtp) throw new ApiError(400, "Invalid OTP");

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { email: user.email, isVerified: user.isVerified },
          "Email verified successfully"
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
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const currentUser = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "fullName", "avatar", "mobile", "isVerified"],
    });

    if (!currentUser) throw new ApiError(404, "User not found");

    return res
      .status(200)
      .json(new ApiResponse(200, currentUser, "User fetched successfully"));
  }),

  updateUser: asyncHandler(async (req, res) => {
    const { email, fullName, mobile } = req.body;
    console.log(req.body);

    const user = await User.findByPk(req.user.id);
    if (!user) throw new ApiError(404, "User not found");

    if (email) user.email = email;
    if (fullName) user.fullName = fullName;
    if (mobile) user.mobile = mobile;

    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User updated successfully"));
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
