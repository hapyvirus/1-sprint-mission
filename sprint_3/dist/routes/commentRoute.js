"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const tokenAuth_1 = require("../lib/tokenAuth");
const commentRoute = express_1.default.Router();
commentRoute.patch("/:id", tokenAuth_1.verifycommentAuth, commentController_1.patchComment);
commentRoute.delete("/:id", tokenAuth_1.verifycommentAuth, commentController_1.deleteComment);
commentRoute.get("/products/:id", commentController_1.getProductCommentDetatil);
commentRoute.post("/products/:id", commentController_1.createProductComment);
commentRoute.get("/articles/:id", commentController_1.getArticleCommentDetail);
commentRoute.post("/articles/:id", commentController_1.creatArticleComment);
exports.default = commentRoute;
