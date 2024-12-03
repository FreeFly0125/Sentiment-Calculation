/** @format */

import { authController } from "@/controllers";
import { AppDataSource } from "@/setup/datasource";
import { UserEntity } from "@/entities";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

describe("Auth Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: Partial<NextFunction>;
  let responseObject = {};

  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(UserEntity).clear();
    responseObject = {};

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockImplementation((result) => {
        responseObject = result;
        return mockResponse;
      }),
    };

    mockNext = jest.fn();
  });

  describe("signUp", () => {
    it("should create a new user successfully", async () => {
      mockRequest = {
        body: {
          name: "testuser",
          password: "password123",
          role: "user",
        },
      };

      await authController.signUp(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toHaveProperty("name", "testuser");
    });

    it("should return 409 if user already exists", async () => {
      const userData = {
        name: "testuser",
        hashedPassword: await bcrypt.hash("password123", 10),
        role: "user",
      };

      const userRepo = AppDataSource.getRepository(UserEntity);
      await userRepo.save(userData);

      mockRequest = {
        body: {
          name: "testuser",
          password: "password123",
          role: "user",
        },
      };

      await authController.signUp(
        mockRequest as Request,
        mockResponse as Response,
        mockNext as NextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(409);
    });
  });
});
