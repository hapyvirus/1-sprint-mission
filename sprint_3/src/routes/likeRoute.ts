import express from "express";
import { getLikedProducts, likeProduct } from "../controllers/likeController";
import auth from "../lib/jwtAuth";

const likeRoute = express.Router();

likeRoute.get("/products", auth.verifyAccessToken, getLikedProducts);
likeRoute.patch("/products/:productId", auth.verifyAccessToken, likeProduct);

export default likeRoute;
