import { NextFunction, Request, Response } from "express";

import ApiError from "utils/ApiError";

const globalErrorHandler = (
    err: ApiError,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    let error: any = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode ? 401 : 500;
        const message = error.message || statusCode;
        error = new ApiError(statusCode, message, false, err.stack);
    }

    let { statusCode, message } = error;
    const response = {
        code: statusCode,
        message,
        stack: err.stack,
    };

    res.status(statusCode).json(response);
};

export default globalErrorHandler;
