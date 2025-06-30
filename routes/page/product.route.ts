import express, { Request, Response } from "express";
import csurf from "csurf";

import { Product } from "models";
import { authenticate } from "utils/authenticate";

const router = express.Router();
const csrfProtection = csurf({ cookie: true });

router.use(authenticate);

router.get("/", async (req: Request, res: Response) => {
    res.render("products/products", { user: req.user });
});

router.use(csrfProtection);

router.get("/add", (req: Request, res: Response) => {
    try {
        res.render("products/add_product", {
            user: req.user,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.log(error);
    }
});
router.get("/edit/:productId", async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.productId);

        res.render("products/edit_product", {
            product,
            user: req.user,
            errors: {},
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;
