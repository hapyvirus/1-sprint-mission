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
exports.deleteProduct = exports.patchProduct = exports.getProductDetail = exports.createProduct = exports.getUserProuct = exports.getProuct = void 0;
const superstruct_1 = require("superstruct");
const productService_1 = __importDefault(require("../services/productService"));
const productStruct_1 = require("../structs/productStruct");
const commonStruct_1 = require("../structs/commonStruct");
const UnauthorizedError_1 = __importDefault(require("../lib/error/UnauthorizedError"));
const getProuct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const { page, pageSize, orderBy, search } = (0, superstruct_1.create)(req.query, productStruct_1.GetProductList);
    const products = yield productService_1.default.getAll(page, pageSize, orderBy, userId, search);
    res.status(200).send(products);
});
exports.getProuct = getProuct;
const getUserProuct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        throw new UnauthorizedError_1.default();
    }
    const { page, pageSize, orderBy } = (0, superstruct_1.create)(req.query, productStruct_1.GetProductList);
    const products = yield productService_1.default.getUserAll(page, pageSize, orderBy, userId);
    res.status(200).send(products);
});
exports.getUserProuct = getUserProuct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        throw new UnauthorizedError_1.default();
    }
    const data = (0, superstruct_1.create)(req.body, productStruct_1.CreateProductBodyStuct);
    const product = yield productService_1.default.createProduct(data, userId);
    res.status(201).send(product);
});
exports.createProduct = createProduct;
const getProductDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const product = yield productService_1.default.getById(id);
    res.status(200).send(product);
});
exports.getProductDetail = getProductDetail;
const patchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        throw new UnauthorizedError_1.default();
    }
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    const data = (0, superstruct_1.create)(req.body, productStruct_1.UpdateProductBodyStuct);
    const updateProduct = yield productService_1.default.update(id, data);
    res.status(201).send(updateProduct);
});
exports.patchProduct = patchProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    if (!userId) {
        throw new UnauthorizedError_1.default();
    }
    const { id } = (0, superstruct_1.create)(req.params, commonStruct_1.IdParamsStruct);
    yield productService_1.default.deleteProduct(id);
    res.sendStatus(204);
});
exports.deleteProduct = deleteProduct;
