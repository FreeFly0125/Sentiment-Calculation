/** @format */

import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "@/routers";
import { Logger } from "@/utilis";
import { errorHandlerMiddleware } from "@/middlewares";

export const backendSetup = () => {
  const app: Express = express();

  app.use(cors());
  app.use(express.json());

  app.use("health", (_req: Request, res: Response) => {
    res.send("It's healthy!");
  }); //health check

  app.use("/api", router);

  app.use(errorHandlerMiddleware);

  const port = process.env.PORT || 8000;

  app.listen(port, () => {
    Logger.info(`Sever is running on ${port}`);
  });
};
