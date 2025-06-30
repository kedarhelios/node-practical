import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.redirect("/login");
    }

    jwt.verify(
        token,
        process.env.JWT_SECRET_KEY as string,
        (err: any, decoded: any) => {
            if (err) {
                return res.redirect("/login");
            }

            req.user = decoded;
            next();
        }
    );
};

export { authenticate };
