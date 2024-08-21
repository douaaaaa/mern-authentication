import express from "express";
import {
  logOut,
  signIn,
  signUp,
  verifyEmail,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signUp);

authRoutes.post("/verify-email", verifyEmail);

authRoutes.post("/signin", signIn);

authRoutes.post("/logout", logOut);

export default authRoutes;
