"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundError extends Error {
    constructor(id) {
        super(`해당 아이디 ${id}를 찾을 수 없습니다.`);
        this.name = "NotFoundError";
    }
}
exports.default = NotFoundError;
