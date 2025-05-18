"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const jwtAuth_1 = __importDefault(require("../lib/jwtAuth"));
const tokenAuth_1 = require("../lib/tokenAuth");
const commentRoute = express_1.default.Router();
commentRoute.patch("/:id", tokenAuth_1.verifyCommentAuth, commentController_1.patchComment);
commentRoute.delete("/:id", tokenAuth_1.verifyCommentAuth, commentController_1.deleteComment);
commentRoute.get("/products/:id", commentController_1.getProductCommentList);
commentRoute.post("/products/:id", jwtAuth_1.default.verifyAccessToken, commentController_1.createProductComment);
commentRoute.get("/articles/:id", commentController_1.getArticleCommentList);
commentRoute.post("/articles/:id", jwtAuth_1.default.verifyAccessToken, commentController_1.creatArticleComment);
exports.default = commentRoute;
