import { NextFunction, Request, Response } from "express";
import { z } from "zod";

import ApiError from "utils/ApiError";

const validate =
    (schema: z.Schema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await schema.safeParseAsync({
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
