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
exports.globalErrorHandler = exports.defaultNotFoundHandler = void 0;
const superstruct_1 = require("superstruct");
const BadReqestError_1 = __importDefault(require("../lib/error/BadReqestError"));
const NotFoundError_1 = __importDefault(require("../lib/error/NotFoundError"));
const ForbiddenError_1 = __importDefault(require("../lib/error/ForbiddenError"));
const UnauthorizedError_1 = __importDefault(require("../lib/error/UnauthorizedError"));
const defaultNotFoundHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).send({ message: "해당 경로를 찾을 수 없습니다." });
});
exports.defaultNotFoundHandler = defaultNotFoundHandler;
const globalErrorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (err instanceof superstruct_1.StructError || err instanceof BadReqestError_1.default) {
        console.warn("잘못된 요청 디테일:", err.message);
        res.status(400).send({ message: "잘못된 요청입니다." });
    }
    else if (err instanceof SyntaxError && err.message.includes("JSON")) {
        console.error("JSON 파싱 오류:", err.message);
        res.status(400).send({ message: "유효하지 않은 JSON입니다." });
    }
    else if (err.code) {
        console.error("데이터 처리 오류:", err);
        res.status(500).send({ message: "데이터 처리에 실패하였습니다." });
    }
    else if (err instanceof NotFoundError_1.default) {
        res.status(404).send({ message: err.message });
    }
    else if (err instanceof UnauthorizedError_1.default) {
        res.status(401).send({ message: err.message });
    }
    else if (err instanceof ForbiddenError_1.default) {
        res.status(403).send({ message: err.message });
    }
    else {
        console.log(err);
        res.status(500).send({ message: "서버에 문제가 발생하였습니다." });
    }
};
exports.globalErrorHandler = globalErrorHandler;
