"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error_handler = error_handler;
const custom_error_class_1 = require("./custom-error.class");
function error_handler(target, name, descriptor) {
    const originFunc = descriptor.value;
    descriptor.value = async function () {
        let result;
        try {
            result = await originFunc.apply(this, arguments);
            arguments[1].status(result.statusCode).json(result);
        }
        catch (error) {
            if (error instanceof custom_error_class_1.CustomError) {
                arguments[1].status(error.statusCode).json({ statusCode: error.statusCode, data: error.msg });
            }
            else {
                arguments[1].status(500).json({ statusCode: 500, data: "Неожиданная ошибка VPN сервера." });
            }
        }
    };
    return descriptor;
}
//# sourceMappingURL=errorHandler.decorator.js.map