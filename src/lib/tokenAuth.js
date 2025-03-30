import productRepository from "../repositories/productRepository.js";
import { catchHandler } from "./catchHandler.js";

export const verifyTokenLogin = catchHandler(async (req, res, next) => {
  const { userId } = req.user;

  if (!userId) {
    return res.status(401).send({ message: " 로그인이 필요합니다." });
  }

  next();
});

export const verifyProductAuth = catchHandler(async (req, res, next) => {
  const { id: productId } = req.params;
  const userId = req.user.userId;
  const product = await productRepository.getById(productId);

  if (!product) {
    const error = new Error("제품을 찾을 수 없습니다.");
    error.code = 404;
    throw error;
  }

  if (product.authorId !== userId) {
    const error = new Error("Forbidden");
    m;
    error.code = 403;
    throw error;
  }
  return next();
});
