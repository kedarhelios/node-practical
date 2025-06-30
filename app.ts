import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import apiRoutes from "routes/api";
import pageRoutes from "routes/page";
import ApiError from "utils/ApiError";
import globalErrorHandler from "utils/errorHandlers";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", pageRoutes);

app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.use((req, res, next) => {
    if (req.path === "/" && req.method === "GET") {
        res.redirect("/login");
    } else {
        next(
            new ApiError(
                404,
                "This route is not yet defined in the application"
            )
        );
    }
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
