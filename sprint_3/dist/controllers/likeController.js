"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeProduct = exports.getLikedProducts = void 0;
const likeService_1 = __importDefault(require("../services/likeService"));
const superstruct_1 = require("superstruct");
const commonStruct_1 = require("../structs/commonStruct");
const getLikedProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const likedProducts = yield likeService_1.default.getLikedProducts(userId);
    res.status(200).send(likedProducts);
});
exports.getLikedProducts = getLikedProducts;
const likeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    yield likeService_1.default.likeProduct(userId, id);
    res.status(201).send({ message: "🫰🏻" });
});
exports.likeProduct = likeProduct;
