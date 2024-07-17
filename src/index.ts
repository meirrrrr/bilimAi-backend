import "dotenv/config";
import express, { Request, Response } from "express";
import globalRouter from "./global-router";
import { logger } from "./logger";
import connectDB from "./db";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(logger);
app.use(express.json());
app.use(cors());

app.get("/", (req, res):void => {
  res.send("Hello world");
});

app.use("/api/v1/", globalRouter);

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
