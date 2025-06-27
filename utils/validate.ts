import ApiError from "../utils/ApiError";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validate =
    (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        if (!result.success) {
            return next(
                new ApiError(
                    401,
                    result.error.errors
                        .map((val: any) => val.message)
                        .join(", ")
                )
            );
        }
        next();
    };

export default validate;
