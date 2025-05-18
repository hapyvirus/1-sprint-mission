"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundError extends Error {
    constructor(entityName) {
        super(`해당 ${entityName}을 찾을 수 없습니다.`);
        this.name = "NotFoundError";
    }
}
exports.default = NotFoundError;
