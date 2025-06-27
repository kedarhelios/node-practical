import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
import ApiError from "./utils/ApiError";
import { errorConverter, errorHandler } from "./utils/errorHandlers";
import path from "path";
import { User } from "./models";
import { Op } from "sequelize";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/login", (req: Request, res: Response, next: NextFunction) => {
    res.render("login");
});
app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.findAll({
        order: [["username", "ASC"]],
    });

    res.render("users", { users });
});
app.get("/users/add", (req: Request, res: Response, next: NextFunction) => {
    try {
        res.render("add_user");
    } catch (error) {
        console.log(error);
    }
});

app.get(
    "/users/edit/:userId",
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await User.findByPk(req.params.userId);
        try {
            // const isCurrentUser = req.user.userId === user.id;
            res.render("edit_user", { user, errors: {}, isCurrentUser: false });
        } catch (error) {
            console.log(error);
        }
    }
);

app.use(bodyParser.json());

app.use("/api", routes);

app.use((_req, _res, next) => {
    next(new ApiError(404, "This route is not yet defined in the application"));
});

app.use(errorConverter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
