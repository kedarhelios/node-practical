import { NextFunction, Request, Response } from "express";

import ApiError from "utils/ApiError";

const errorConverter = (
    err: ApiError,
    _req: Request,
    _res: Response,
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

const errorHandler = (err: ApiError, _req: Request, res: Response) => {
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
