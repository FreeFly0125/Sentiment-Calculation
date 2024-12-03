/** @format */

import { databaseSetup } from "./setup";

const setupServer = async () => {
  try {
    await databaseSetup();
  } catch (err) {}
};

setupServer();
