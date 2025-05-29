import request from "supertest";
import { app } from "../../app";
import prisma from "../../config/prisma";

// export function extractAccessTokenFromSetCookie(
//   setCookieHeader?: string[]
// ): string | undefined {
//   if (!setCookieHeader || !Array.isArray(setCookieHeader)) return;

//   const accessTokenCookie = setCookieHeader.find((cookie: string) =>
//     cookie.startsWith("accessToken=")
//   );

//   if (!accessTokenCookie) return;

//   return accessTokenCookie.split(";")[0].split("accessToken=")[1];
// }

describe("인증이 필요한 product 관련 테스트", () => {
  beforeEach(async () => {
    await prisma.notification.deleteMany();
    await prisma.like.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("GET /products", () => {
    test("인증 유저 목록 조회", async () => {
      const agent = request.agent(app);

      const user = await request(app).post("/users").send({
        email: "test3@example.com",
        nickname: "user2",
        password: "Password@1234",
      });
      console.log(user.body.id);

      const loginResponse = await agent.post("/users/login").send({
        email: "test3@example.com",
        password: "Password@1234",
      });

      console.log(agent);

      console.log(loginResponse.header);
      // const accessToken = extractAccessTokenFromSetCookie(
      //   Array.isArray(loginResponse.headers["set-cookie"])
      //     ? loginResponse.headers["set-cookie"]
      //     : [loginResponse.headers["set-cookie"]]
      // );
      // expect(accessToken).toBeDefined();

      const product = await prisma.product.create({
        data: {
          name: "테스트 제품",
          description: "테스트용으로 생성된 제품입니다.",
          price: 10000,
          authorId: user.body.id,
        },
      });

      await prisma.like.create({
        data: {
          authorId: user.body.id,
          productId: product.id,
        },
      });

      const response = await agent.get("/products");
      // const response = await request(app)
      //   .get("/products")
      //   .set("Authorization", `Bearer ${accessToken}`);
      expect(response.status).toBe(200);
      expect(response.body.products[0].name).toBe("테스트 제품");
      expect(response.body.products[0].isLiked).toBe(true);
    });
  });

  // describe("POST /products", () => {
  //   test("제품 생성", async () => {
  //     const agent = request.agent(app);

  //     const user = agent.post("/user").send({
  //       data: {
  //         email: "test@example.com",
  //         nickname: "user",
  //         password: "Password@1234",
  //       },
  //     });

  //     const loginResponse = await agent
  //       .post("/users/login")
  //       .send({ email: "test@example.com", password: "Password@1234" });
  //   });
  // });
});
