import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "models";
import ApiError from "utils/ApiError";
import catchAsync from "utils/catchAsync";

const login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const { username, password } = req.body;

        const user = await User.findOne({
            where: { username },
            attributes: ["id", "name", "password"],
        });
        if (!user) {
            return next(new ApiError(401, "Invalid credentials"));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(new ApiError(401, "Invalid credentials"));
        }

        const token = jwt.sign(
            { userId: user.id, name: user.name },
            process.env.JWT_SECRET_KEY as string,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.redirect("/users");
    }
);

export { login };
