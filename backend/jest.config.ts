/** @format */

import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ["<rootDir>/src/tests/setup.ts"],
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/tests/**/*.{ts,tsx}",
    "!src/types/**/*.{ts,tsx}",
  ],
};

export default config;
