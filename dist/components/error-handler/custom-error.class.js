"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    msg;
    statusCode;
    defaultError;
    constructor(statusCode, msg, e, ...args) {
        super();
        this.msg = msg;
        this.statusCode = statusCode;
        this.defaultError = e;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom-error.class.js.map