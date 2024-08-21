import express from "express";
import {
  logOut,
  signIn,
  signUp,
  verifyEmail,
  forgetPassword,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);

authRoutes.post("/signin", signIn);

authRoutes.post("/logout", logOut);

authRoutes.post("/verify-email", verifyEmail);

authRoutes.post("/forget-password", forgetPassword);

export default authRoutes;
