import express from "express";
import "dotenv/config";
import { connectDB } from "./db/connectDB.js";

const app = express();

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`the server is running on the port ${process.env.PORT}`);
});
