"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
let LoggerService = class LoggerService {
    logger = new common_1.Logger();
    log(message, className, methodName) {
        this.logger.log(`[${className}] > [${methodName}] > ${message}`);
    }
    debug(message, className, methodName) {
        this.logger.debug(`[${className}] > [${methodName}] > ${message}`);
    }
    response(path, method) {
        this.logger.log(`[${method}] ${path}`);
    }
    request(path, method, statusCode) {
        this.logger.log(`[${method}] ${path} > STATUS:${statusCode}`);
    }
    asynckLog(message, asyncMethodName) {
        this.logger.log(`[ASYNC][${asyncMethodName}] > ${message}`);
    }
    asynckError(message, asyncMethodName, stack = "") {
        if (stack != "")
            this.logger.log(`[ASYNC][${asyncMethodName}] > ${message} > ${stack}`);
        else
            this.logger.log(`[ASYNC][${asyncMethodName}] > ${message}`);
    }
    error(message, className, methodName) {
        this.logger.error(`[${className}] > [${methodName}] > ${message}`);
    }
    warn(message, className, methodName) {
        this.logger.warn(`[${className}] > [${methodName}] > ${message}`);
    }
    fatal(message, className, methodName) {
        this.logger.fatal(`[${className}] > [${methodName}] > ${message}`);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)()
], LoggerService);
//# sourceMappingURL=logger.service.js.map