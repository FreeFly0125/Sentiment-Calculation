/** @format */

import express from "express";
import { sentimentRouter } from "./sentiment.router";
import { authRouter } from "./auth.router";

const router = express.Router();

router.use("/sentiment", sentimentRouter);
router.use("/auth", authRouter);

export default router;
