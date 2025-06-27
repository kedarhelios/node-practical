import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return next(new ApiError(401, "No token provided"));
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string,
        (err: any, decoded: any) => {
            if (err) {
                return next(new ApiError(401, "Invalid or expired token"));
            }

            req.user = decoded;
            next();
        }
    );
};

export { authenticate };
