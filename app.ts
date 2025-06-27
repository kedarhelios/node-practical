import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import routes from "./routes";
import ApiError from "./utils/ApiError";
import { errorConverter, errorHandler } from "./utils/errorHandlers";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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
