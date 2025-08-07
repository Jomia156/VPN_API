import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService {
    private logger = new Logger();

    log(message: string, className: string, methodName: string) {
        this.logger.log(`[${className}] > [${methodName}] > ${message}`);
    }

    debug(message: string, className: string, methodName: string) {
        this.logger.debug(`[${className}] > [${methodName}] > ${message}`);
    }

    response(path: string, method: string) {
        this.logger.log(`[${method}] ${path}`)
    }

    request(path: string, method: string, statusCode: number) {
        this.logger.log(`[${method}] ${path} > STATUS:${statusCode}`)
    }

    asynckLog(message: string, asyncMethodName: string) {
        this.logger.log(`[ASYNC][${asyncMethodName}] > ${message}`)
    }
    asynckError(message: string, asyncMethodName: string, stack: any = "") {
        if (stack != "") this.logger.log(`[ASYNC][${asyncMethodName}] > ${message} > ${stack}`)
        else this.logger.log(`[ASYNC][${asyncMethodName}] > ${message}`)
    }

    error(message: string, className: string, methodName: string) {
        this.logger.error(`[${className}] > [${methodName}] > ${message}`);
    }

    warn(message: string, className: string, methodName: string) {
        this.logger.warn(`[${className}] > [${methodName}] > ${message}`);
    }

    fatal(message: string, className: string, methodName: string) {
        this.logger.fatal(`[${className}] > [${methodName}] > ${message}`);
    }
}

