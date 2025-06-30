import express, { Request, Response } from "express";
import csurf from "csurf";

import { Product } from "models";
import { authenticate } from "utils/authenticate";
import catchAsync from "utils/catchAsync";

const router = express.Router();
const csrfProtection = csurf({ cookie: true });

router.use(authenticate);

router.get("/", async (req: Request, res: Response) => {
    res.render("products/products", { user: req.user });
});

router.use(csrfProtection);

router.get("/add", (req: Request, res: Response) => {
    res.render("products/add_product", {
        user: req.user,
        csrfToken: req.csrfToken(),
    });
});
router.get(
    "/edit/:productId",
    catchAsync(async (req: Request, res: Response) => {
        const product = await Product.findByPk(req.params.productId);

        res.render("products/edit_product", {
            product,
            user: req.user,
            errors: {},
            csrfToken: req.csrfToken(),
        });
    })
);

export default router;
