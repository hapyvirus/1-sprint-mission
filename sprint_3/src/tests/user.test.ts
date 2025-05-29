import request from "supertest";
import { app } from "../app";
import prisma from "../config/prisma";

describe("회원 가입, 로그인 테스트", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe("POST/users", () => {
    test("회원가입", async () => {
      const response = await request(app).post("/users").send({
        email: "test1@example.com",
        nickname: "user1",
        password: "Password@1234",
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("nickname", "user1");
    });

    test("로그인", async () => {
      const user1 = await request(app).post("/users").send({
        email: "test1@example.com",
        nickname: "user1",
        password: "Password@1234",
      });

      const response = await request(app).post("/users/login").send({
        email: "test1@example.com",
        nickname: "user1",
        password: "Password@1234",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({});
    });
  });
});
