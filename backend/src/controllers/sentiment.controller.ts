/** @format */

import { sentimentService } from "@/services";
import { errorHandlerWrapper } from "@/utilis";
import { Request, Response } from "express";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

const createSentimentHandler = async (req: Request, res: Response) => {
  const { user, feedback } = req.body;
  const result = sentiment.analyze(feedback);

  const sentimentLabel: string =
    result.score > 0 ? "Good" : result.score < 0 ? "Bad" : "Neutral";

  const newSentiment = await sentimentService.createSentiment({
    user,
    feedback,
    sentimentLabel,
  });

  res.status(201).json({ newSentiment });
};

const getAllSentimentHandler = async (req: Request, res: Response) => {
  const sentiments = await sentimentService.getAllSentiment();

  res.status(200).json({ sentiments });
};

export const createSentiment = errorHandlerWrapper(createSentimentHandler);
export const getAllSentiment = errorHandlerWrapper(getAllSentimentHandler);
