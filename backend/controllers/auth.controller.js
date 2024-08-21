import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSendCookie from "../utils/generateTokenAndSendCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signUp = async (req, res) => {
  // get data
  const { name, email, password } = req.body;
  try {
    // check if all data are entered
    if (!email || !name || !password) {
      throw new Error("All fields are required");
    }
    // check if the user does not exist
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, message: "user already exists" });
    }
    // hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    // generate verification token
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    // create the new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });
    await user.save();
    // jwt
    generateTokenAndSendCookie(res, user._id);
    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
    // send email
    await sendVerificationEmail(user.email, verificationToken);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "invalid or expired verification code",
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({ success: true, message: "email verified" });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isExist = await User.findOne({ email });
    // check if the user exists
    if (!isExist) {
      return res
        .status(404)
        .json({ success: false, message: "invalide credentials" });
    }
    // check if the password correct
    const isPasswordValid = await bcryptjs.compare(password, isExist.password);
    if (!isPasswordValid) {
      return res
        .status(404)
        .json({ success: false, message: "invalide credentials" });
    }
    // generate token
    generateTokenAndSendCookie(res, isExist._id);
    isExist.lastLogin = new Date();
    await isExist.save();
    res.status(200).json({
      success: true,
      message: "user login successfully",
      user: {
        ...isExist._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logOut = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "logged out successfully" });
};
