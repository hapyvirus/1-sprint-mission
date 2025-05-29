import request from "supertest";
import { app } from "../../app";
import prisma from "../../config/prisma";

const agent = request.agent(app);

describe("인증이 필요한 article 관련 테스트", () => {
  beforeEach(async () => {
    await prisma.notification.deleteMany();
    await prisma.like.deleteMany();
    await prisma.article.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("POST /articles", () => {
    test("게시글 등록", async () => {
      const user = await agent.post("/users").send({
        email: "article@example.com",
        nickname: "user",
        password: "Password@1234",
      });
      expect(user.status).toBe(201);
      expect(user.body.id).toBeDefined();

      const login = await agent.post("/users/login").send({
        email: "article@example.com",
        password: "Password@1234",
      });
      expect(login.status).toBe(200);

      const article = {
        title: "테스트 입니다.",
        content: "테스트 게시글입니다.",
      };

      const response = await agent.post("/articles").send(article);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe("테스트 입니다.");
      expect(response.body.content).toBe("테스트 게시글입니다.");
      expect(response.body.id).toBeDefined();
    });
  });

  describe("PATCH /articles/:id", () => {
    test("게시글 수정", async () => {
      // const userList = await prisma.user.findMany();
      // console.log(userList);
      const user = await agent.post("/users").send({
        email: "article@example.com",
        nickname: "user",
        password: "Password@1234",
      });
      expect(user.status).toBe(201);
      expect(user.body.id).toBeDefined();

      const login = await agent.post("/users/login").send({
        email: "article@example.com",
        password: "Password@1234",
      });
      expect(login.status).toBe(200);

      const article = await prisma.article.create({
        data: {
          title: "테스트 입니다.",
          content: "테스트 게시글입니다.",
          authorId: user.body.id,
        },
      });

      const update = {
        title: "테스트 2",
      };

      const response = await agent
        .patch(`/articles/${article.id}`)
        .send(update);
      expect(response.status).toBe(201);
      expect(response.body.title).toBe("테스트 2");
    });
  });

  describe("DELETE /articles/:id", () => {
    test("게시글 삭제", async () => {
      const user = await agent.post("/users").send({
        email: "article@example.com",
        nickname: "user",
        password: "Password@1234",
      });
      expect(user.status).toBe(201);
      expect(user.body.id).toBeDefined();

      const login = await agent.post("/users/login").send({
        email: "article@example.com",
        password: "Password@1234",
      });
      expect(login.status).toBe(200);

      const article = await prisma.article.create({
        data: {
          title: "테스트 입니다.",
          content: "테스트 게시글입니다.",
          authorId: user.body.id,
        },
      });

      const response = await agent.delete(`/articles/${article.id}`).send();
      expect(response.status).toBe(204);
    });
  });
});
