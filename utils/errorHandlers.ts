import ApiError from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";

const errorConverter = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let error: any = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode ? 401 : 500;
        const message = error.message || statusCode;
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

const errorHandler = (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let { statusCode, message } = err;

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        stack: err.stack,
    };

    res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
