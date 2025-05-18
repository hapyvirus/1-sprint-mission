"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthorizedError extends Error {
    constructor() {
        super("로그인이 필요합니다.");
        this.name = "UnauthorizedError";
    }
}
exports.default = UnauthorizedError;
