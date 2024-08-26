import express from "express";
import "dotenv/config";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`the server is running on the port ${process.env.PORT}`);
});
