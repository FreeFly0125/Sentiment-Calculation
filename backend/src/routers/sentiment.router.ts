/** @format */

import { sentimentController } from "@/controllers";
import { errorHandlerMiddleware } from "@/middlewares";
import { Router } from "express";

export const sentimentRouter = Router();

sentimentRouter.post(
  "/",
  errorHandlerMiddleware,
  sentimentController.createSentiment
);
sentimentRouter.get(
  "/",
  errorHandlerMiddleware,
  sentimentController.getAllSentiment
);
