/** @format */

import { SentimentEntity } from "@/entities";
import { AppDataSource } from "@/setup/datasource";
import { CreateSentimentType } from "@/types/sentiment.type";

export const createSentiment = async ({
  user,
  feedback,
  sentimentLabel,
}: CreateSentimentType): Promise<SentimentEntity> => {
  const sentimentRepository = AppDataSource.getRepository(SentimentEntity);

  const newSentiment = new SentimentEntity();

  Object.assign(newSentiment, { user, feedback, sentimentLabel });
  return await sentimentRepository.save(newSentiment);
};

export const getAllSentiment = async (): Promise<SentimentEntity[] | null> => {
  const sentimentRepository = AppDataSource.getRepository(SentimentEntity);

  const sentiments = await sentimentRepository.find();

  if (sentiments) return sentiments;
  return null;
};
