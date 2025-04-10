import express from "express";
import { likeArticle, likeProduct } from "../controllers/likeController";
import { catchHandler } from "../lib/catchHandler";

const likeRoute = express.Router();

likeRoute.patch("/products/:productId", catchHandler(likeProduct));
likeRoute.patch("/articles/:articleId", catchHandler(likeArticle));

export default likeRoute;
