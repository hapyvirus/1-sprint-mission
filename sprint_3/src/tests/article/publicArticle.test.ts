import request from "supertest";
import { app } from "../../app";
import prisma from "../../config/prisma";

describe("인증되지 않은 게시글 관련 테스트", () => {
  beforeEach(async () => {
    await prisma.notification.deleteMany();
    await prisma.like.deleteMany();
    await prisma.article.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET/articles", () => {
    test("게시글이 없을 때는 빈 배열을 반환", async () => {
      const response = await request(app).get("/articles");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ articles: [], totalCount: 0 });
    });

    test("모든 등록된 게시글을 반환", async () => {
      const user = await prisma.user.create({
        data: {
          email: "test2@example.com",
          password: "securepassword",
          nickname: "tester2",
        },
      });

      const article1 = await prisma.article.create({
        data: {
          title: "게시글1",
          content: "test content",
          authorId: user.id,
        },
      });

      const article2 = await prisma.article.create({
        data: {
          title: "게시글2",
          content: "test content",
          authorId: user.id,
        },
      });

      const response = await request(app).get("/articles");
      expect(response.status).toBe(200);
      expect(response.body.articles.length).toBe(2);
      expect(response.body.articles[0].title).toBe("게시글2");
      expect(response.body.articles[1].title).toBe("게시글1");
    });
  });

  // describe("GET/articles/:id", () => {
  //   test("특정 게시글 조회", async () => {
  //     const user = await prisma.user.create({
  //       data: {
  //         email: "article@example.com",
  //         password: "securepassword",
  //         nickname: "tester2",
  //       },
  //     });

  //     const article1 = await prisma.article.create({
  //       data: {
  //         title: "게시글1",
  //         content: "test content",
  //         authorId: user.id,
  //       },
  //     });

  //     const response = await request(app).get(`/articles/${article1.id}`);
  //     expect(response.status).toBe(200);
  //     expect(response.body).toHaveProperty("title", "게시글1");
  //     expect(response.body).toHaveProperty("id", article1.id);
  //   });
  // });
});
