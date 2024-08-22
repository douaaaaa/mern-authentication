import express from "express";
import "dotenv/config";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ expended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`the server is running on the port ${process.env.PORT}`);
});
