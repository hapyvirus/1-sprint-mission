import express from "express";
import { likeArticle, likeProduct } from "../controllers/likeController.js";
import { catchHandler } from "../lib/catchHandler.js";

const likeRoute = express.Router();

likeRoute.patch("/products/:productId", catchHandler(likeProduct));
likeRoute.patch("/articles/:articleId", catchHandler(likeArticle));

export default likeRoute;
