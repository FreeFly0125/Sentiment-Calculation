/** @format */

import { databaseSetup } from "./setup";
import { backendSetup } from "./setup/backend.setup";
import { Logger } from "./utilis";

const setupServer = async () => {
  try {
    await databaseSetup();
    Logger.info("Connected Database!");
  } catch (err) {
    Logger.error(err);
    Logger.info("Failed to connect to database");
  }

  try {
    await backendSetup();
    Logger.info("Sever is running now!");
  } catch (err) {
    Logger.error(err);
    Logger.info("Sever running failed!");
  }
};

setupServer();
