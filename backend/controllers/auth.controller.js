import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSendCookie from "../utils/generateTokenAndSendCookie.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";

export const signUp = async (req, res) => {
  // take data
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

export const signIn = async (req, res) => {
  res.send("SignIn route");
};

export const logOut = async (req, res) => {
  res.send("LogOut route");
};
