import express, { Request, Response } from "express";
import userRoute from "./user.route";
import productRoute from "./product.route";

const router = express.Router();

router.get("/login", (_req: Request, res: Response) => {
    res.render("login");
});
router.use("/users", userRoute);
router.use("/products", productRoute);

export default router;
