export declare class CustomError extends Error {
    msg: string;
    statusCode: number;
    defaultError: Error;
    constructor(statusCode: number, msg: string, e: Error, ...args: any[]);
}
