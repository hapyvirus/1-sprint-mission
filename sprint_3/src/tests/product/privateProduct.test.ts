import request from "supertest";
import { app } from "../../app";
import prisma from "../../config/prisma";

const agent = request.agent(app);

describe("인증이 필요한 product 관련 테스트", () => {
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

  describe("GET /products", () => {
    test("인증 유저 목록 조회", async () => {
      const user = await agent.post("/users").send({
        email: "test3@example.com",
        nickname: "user2",
        password: "Password@1234",
      });
      expect(user.status).toBe(201);
      expect(user.body.id).toBeDefined();

      const login = await agent.post("/users/login").send({
        email: "test3@example.com",
        password: "Password@1234",
      });
      expect(login.status).toBe(200);

      const product = await prisma.product.create({
        data: {
          name: "테스트 제품",
          description: "테스트용으로 생성된 제품입니다.",
          price: 10000,
          authorId: user.body.id,
          tags: ["test"],
          images: ["images"],
        },
      });

      const likes = await prisma.like.create({
        data: {
          authorId: user.body.id,
          productId: product.id,
        },
      });

      const response = await agent.get("/products");

      expect(response.status).toBe(200);
      expect(response.body.products[0].name).toBe("테스트 제품");
      expect(response.body.products[0].isLiked).toBe(true);
    });
  });

  describe("POST /products", () => {
    test("제품 생성", async () => {
      const user = await agent.post("/users").send({
        email: "test@example.com",
        nickname: "user",
        password: "Password@1234",
      });
      expect(user.status).toBe(201);
      expect(user.body.id).toBeDefined();

      const login = await agent
        .post("/users/login")
        .send({ email: "test@example.com", password: "Password@1234" });
      expect(login.status).toBe(200);

      const product = {
        name: "테스트 제품",
        description: "테스트용으로 생성된 제품입니다.",
        price: 10000,
        tags: ["tag1"],
        images: ["image1"],
      };

      const response = await agent.post("/products").send(product);
      expect(response.status).toBe(201);
      expect(response.body.name).toBe("테스트 제품");
      expect(response.body.description).toBe("테스트용으로 생성된 제품입니다.");
      expect(response.body.price).toBe(10000);
      expect(response.body.tags).toEqual(["tag1"]);
      expect(response.body.images).toEqual(["image1"]);
      expect(response.body.authorId).toBe(user.body.id);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("PATCH /products/:id", () => {
    test("제품 정보 수정", async () => {
      const user = await agent.post("/users").send({
        email: "test@example.com",
        nickname: "user",
        password: "Password@1234",
      });
      expect(user.status).toBe(201);
      expect(user.body.id).toBeDefined();

      const login = await agent
        .post("/users/login")
        .send({ email: "test@example.com", password: "Password@1234" });
      expect(login.status).toBe(200);

      const product = await prisma.product.create({
        data: {
          name: "테스트 제품",
          description: "테스트용으로 생성된 제품입니다.",
          price: 10000,
          authorId: user.body.id,
          tags: ["test"],
          images: ["images"],
        },
      });

      const update = {
        price: 12000,
      };

      const response = await agent
        .patch(`/products/${product.id}`)
        .send(update);
      expect(response.status).toBe(201);
      expect(response.body.price).toBe(12000);
    });
  });

  describe("DELETE /products/:id", () => {
    test("등록한 제품을 삭제", async () => {
      const user = await agent.post("/users").send({
        email: "test@example.com",
        nickname: "user",
        password: "Password@1234",
      });
      expect(user.status).toBe(201);
      expect(user.body.id).toBeDefined();

      const login = await agent
        .post("/users/login")
        .send({ email: "test@example.com", password: "Password@1234" });
      expect(login.status).toBe(200);

      const product = await prisma.product.create({
        data: {
          name: "테스트 제품",
          description: "테스트용으로 생성된 제품입니다.",
          price: 10000,
          authorId: user.body.id,
          tags: ["test"],
          images: ["images"],
        },
      });

      const response = await agent.delete(`/products/${product.id}`).send();
      expect(response.status).toBe(204);
    });
  });
});
