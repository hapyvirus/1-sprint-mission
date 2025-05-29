import request from "supertest";
import { app } from "../../app";
import prisma from "../../config/prisma";

describe("인증이 필요없는 product 관련 테스트", () => {
  beforeEach(async () => {
    await prisma.notification.deleteMany();
    await prisma.like.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.notification.deleteMany();
    await prisma.like.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  describe("GET/products", () => {
    test("제품이 없을 때는 빈 배열을 반환", async () => {
      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ products: [], totalCount: 0 });
    });

    test("모든 등록된 제품을 반환", async () => {
      const user = await prisma.user.create({
        data: {
          email: "test@example.com",
          password: "securepassword",
          nickname: "tester",
        },
      });
      console.log("user:", user);
      const product1 = await prisma.product.create({
        data: {
          name: "제품1",
          description: "제품입니다.",
          price: 20000,
          images: ["http://www.naver.com/1111"],
          tags: ["tag1", "tag2"],
          authorId: user.id,
        },
      });

      const product2 = await prisma.product.create({
        data: {
          name: "제품2",
          description: "제품입니다.",
          price: 20000,
          images: ["http://www.naver.com/2222"],
          tags: ["tag3", "tag4"],
          authorId: user.id,
        },
      });

      const response = await request(app).get("/products");
      expect(response.status).toBe(200);
      expect(response.body.products.length).toBe(2);
      expect(response.body.products[0].name).toBe("제품2");
      expect(response.body.products[1].name).toBe("제품1");
    });
  });

  describe("GET/products/:id", () => {
    test("특정 제품을 조회", async () => {
      const user = await prisma.user.create({
        data: {
          email: "test@example.com",
          password: "securepassword",
          nickname: "tester",
        },
      });

      const product2 = await prisma.product.create({
        data: {
          name: "제품2",
          description: "제품입니다.",
          price: 20000,
          images: ["http://www.naver.com/2222"],
          tags: ["tag3", "tag4"],
          authorId: user.id,
        },
      });

      const response = await request(app).get(`/products/${product2.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name", "제품2");
      expect(response.body).toHaveProperty("id", product2.id);
    });
  });
});
