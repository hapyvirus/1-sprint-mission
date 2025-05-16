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
const BadReqestError_1 = __importDefault(require("../lib/error/BadReqestError"));
const defaultNotFoundHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(404).send({ message: "해당 경로를 찾을 수 없습니다." });
});
exports.defaultNotFoundHandler = defaultNotFoundHandler;
const globalErrorHandler = (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (err instanceof BadReqestError_1.default) {
        res.status(400).send({ message: err.message });
    }
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        res.status(400).send({ message: "휴요하지 않은 JSON 입니다." });
    }
    if (err.code) {
        console.log(err);
        res.status(500).send({ message: "데이터 생성이 실패하였습니다." });
    }
    else
        err;
    console.log(err);
    res.status(500).send({ message: "서버에 문제가 발생했습니다." });
    next(err);
});
exports.globalErrorHandler = globalErrorHandler;
