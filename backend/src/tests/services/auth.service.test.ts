/** @format */

import { authService } from "@/services";
import { AppDataSource } from "@/setup/datasource";
import { UserEntity } from "@/entities";
import bcrypt from "bcryptjs";

describe("Auth Service", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    await AppDataSource.getRepository(UserEntity).clear();
  });

  describe("createUser", () => {
    it("should create a new user successfully", async () => {
      const userData = {
        name: "testuser",
        hashedPassword: await bcrypt.hash("password123", 10),
        role: "user",
      };

      const result = await authService.createUser(userData);

      expect(result).toBeDefined();
      expect(result.name).toBe(userData.name);
      expect(result.role).toBe(userData.role);
    });

    it("should return null if user already exists", async () => {
      const userData = {
        name: "testuser",
        hashedPassword: await bcrypt.hash("password123", 10),
        role: "user",
      };

      await authService.createUser(userData);
      const result = await authService.createUser(userData);

      expect(result).toBeNull();
    });
  });

  describe("getUser", () => {
    it("should return user if exists", async () => {
      const userData = {
        name: "testuser",
        hashedPassword: await bcrypt.hash("password123", 10),
        role: "user",
      };

      await authService.createUser(userData);
      const result = await authService.getUser({ name: "testuser" });

      expect(result).toBeDefined();
      expect(result.name).toBe(userData.name);
    });

    it("should return null if user does not exist", async () => {
      const result = await authService.getUser({ name: "nonexistent" });
      expect(result).toBeNull();
    });
  });
});
