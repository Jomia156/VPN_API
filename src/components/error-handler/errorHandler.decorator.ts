import {CustomError} from "./custom-error.class"
import {RequestProp} from "../../publicDTO"

export function error_handler (target, name, descriptor) {
    const originFunc = descriptor.value
    
    descriptor.value = async function() {
        let result:RequestProp
        try {
            result = await originFunc.apply(this, arguments)
            arguments[1].status(result.statusCode).json(result)
        }
        catch (error) {
            if (error instanceof CustomError) {
                arguments[1].status(error.statusCode).json({statusCode:error.statusCode, data:error.msg})
            }
            else {
                arguments[1].status(500).json({statusCode:500, data:"Неожиданная ошибка VPN сервера."})
            }
        }
        
    }
    return descriptor
}

