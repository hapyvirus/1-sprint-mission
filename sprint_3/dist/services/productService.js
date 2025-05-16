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
const NotFoundError_1 = __importDefault(require("../lib/error/NotFoundError"));
const productRepository_1 = __importDefault(require("../repositories/productRepository"));
const getAll = (page, pageSize, orderBy, search, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productRepository_1.default.getAll({
        page,
        pageSize,
        orderBy,
        search,
        userId,
    });
    return products;
});
const getUserAll = (page, pageSize, orderBy, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productRepository_1.default.getUserAll({
        page,
        pageSize,
        orderBy,
        userId,
    });
    return products;
});
const createProduct = (data, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    return productRepository_1.default.save(Object.assign(Object.assign({}, data), { authorId }));
});
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield productRepository_1.default.getById(id);
        if (!product) {
            throw new NotFoundError_1.default(id);
        }
        return product;
    });
}
const update = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = yield productRepository_1.default.getById(id);
    if (!findProduct) {
        throw new NotFoundError_1.default(id);
    }
    return yield productRepository_1.default.update(id, product);
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findProduct = yield productRepository_1.default.getById(id);
    if (!findProduct) {
        throw new NotFoundError_1.default(id);
    }
    return yield productRepository_1.default.deleteProduct(id);
});
exports.default = {
    createProduct,
    getById,
    update,
    deleteProduct,
    getUserAll,
    getAll,
};
