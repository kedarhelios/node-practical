import express, { Request, Response } from "express";
import csurf from "csurf";

import userRoute from "./user.route";
import productRoute from "./product.route";

const router = express.Router();
const csrfProtection = csurf({ cookie: true });

router.get("/login", csrfProtection, (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (token) {
        return res.redirect("/users");
    }
    res.render("login", { csrfToken: req.csrfToken() });
});
router.use("/users", userRoute);
router.use("/products", productRoute);

export default router;
