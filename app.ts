import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
import ApiError from "./utils/ApiError";
import { errorConverter, errorHandler } from "./utils/errorHandlers";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/login", (req: Request, res: Response, next: NextFunction) => {
    res.render("login");
});

app.use(bodyParser.json());

app.use("/", routes);

app.use((_req, _res, next) => {
    next(new ApiError(404, "This route is not yet defined in the application"));
});

app.use(errorConverter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
