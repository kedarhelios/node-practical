import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
import ApiError from "./utils/ApiError";
import { errorConverter, errorHandler } from "./utils/errorHandlers";
import path from "path";
import { User } from "./models";
import cookieParser from "cookie-parser";
import { authenticate } from "utils/authenticate";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/login", (_req: Request, res: Response) => {
    res.render("login");
});
app.get("/users", authenticate, async (req: Request, res: Response) => {
    const users = await User.findAll({
        order: [["username", "ASC"]],
    });

    res.render("users/users", { users, user: req.user });
});
app.get("/users/add", authenticate, (req: Request, res: Response) => {
    try {
        res.render("users/add_user", { user: req.user });
    } catch (error) {
        console.log(error);
    }
});

app.get(
    "/users/edit/:userId",
    authenticate,
    async (req: Request, res: Response) => {
        try {
            const user = await User.findByPk(req.params.userId);
            const isCurrentUser = req.user.userId === user.id;
            res.render("users/edit_user", { user, errors: {}, isCurrentUser });
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
