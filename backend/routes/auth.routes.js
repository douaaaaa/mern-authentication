import express from "express";
import {
  logOut,
  signIn,
  signUp,
  verifyEmail,
  forgetPassword,
  resetPassword,
  checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const authRoutes = express.Router();

authRoutes.get("/check-auth", verifyToken, checkAuth);

authRoutes.post("/signup", signUp);

authRoutes.post("/verify-email", verifyEmail);

authRoutes.post("/logout", logOut);

authRoutes.post("/signin", signIn);

authRoutes.post("/forget-password", forgetPassword);

authRoutes.post("/reset-password/:token", resetPassword);

export default authRoutes;
