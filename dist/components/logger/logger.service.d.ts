export declare class LoggerService {
    private logger;
    log(message: string, className: string, methodName: string): void;
    debug(message: string, className: string, methodName: string): void;
    response(path: string, method: string): void;
    request(path: string, method: string, statusCode: number): void;
    asynckLog(message: string, asyncMethodName: string): void;
    asynckError(message: string, asyncMethodName: string, stack?: any): void;
    error(message: string, className: string, methodName: string): void;
    warn(message: string, className: string, methodName: string): void;
    fatal(message: string, className: string, methodName: string): void;
}
