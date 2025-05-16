"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articleController_1 = require("../controllers/articleController");
const tokenAuth_1 = require("../lib/tokenAuth");
const catchHandler_1 = require("../lib/catchHandler");
const jwtAuth_1 = __importDefault(require("../lib/jwtAuth"));
const articleRoute = express_1.default.Router();
articleRoute.get("/", (0, catchHandler_1.catchHandler)(articleController_1.getArticle));
articleRoute.get("/user", jwtAuth_1.default.verifyAccessToken, (0, catchHandler_1.catchHandler)(articleController_1.getArticle));
articleRoute.post("/", jwtAuth_1.default.verifyAccessToken, (0, catchHandler_1.catchHandler)(articleController_1.createArticle));
articleRoute.get("/:id", (0, catchHandler_1.catchHandler)(articleController_1.getArticleDetail));
articleRoute.patch("/:id", jwtAuth_1.default.verifyAccessToken, tokenAuth_1.verifyArticleAuth, (0, catchHandler_1.catchHandler)(articleController_1.patchArticle));
articleRoute.delete("/:id", jwtAuth_1.default.verifyAccessToken, tokenAuth_1.verifyArticleAuth, (0, catchHandler_1.catchHandler)(articleController_1.deleteArticle));
exports.default = articleRoute;
