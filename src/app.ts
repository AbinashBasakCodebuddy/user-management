import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes";
import path from "path";
import { log } from "console";

log("Loading environment variables from .env file...");
log(path.resolve(process.cwd(), ".env"));

dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

import { validateEnv } from "./validators/env.validators";

validateEnv();

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);

export default app;
