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
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_js_1.default.user.findUnique({
        where: {
            id,
        },
    });
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_js_1.default.user.findUnique({
        where: { email },
    });
});
const save = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_js_1.default.user.create({
        data: {
            email: user.email,
            nickname: user.nickname,
            password: user.password,
            image: user.image,
        },
    });
});
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_js_1.default.user.update({
        where: {
            id,
        },
        data: data,
    });
});
exports.default = {
    findById,
    findByEmail,
    save,
    update,
};
