import express from "express";
import {
  logOut,
  signIn,
  signUp,
  verifyEmail,
  forgetPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);

authRoutes.post("/verify-email", verifyEmail);

authRoutes.post("/logout", logOut);

authRoutes.post("/signin", signIn);

authRoutes.post("/forget-password", forgetPassword);

authRoutes.post("/reset-password/:token", resetPassword);

export default authRoutes;
