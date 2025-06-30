import express, { Request, Response } from "express";

import { Product } from "models";
import { authenticate } from "utils/authenticate";

const router = express.Router();
router.use(authenticate);

router.get("/", async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [["name", "ASC"]],
    });

    res.render("products/products", { products, user: req.user });
});
router.get("/add", (req: Request, res: Response) => {
    try {
        res.render("products/add_product", { user: req.user });
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
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;
