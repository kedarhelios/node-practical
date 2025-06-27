import express from "express";
import userRoute from "./user.route";
import productRoute from "./product.route";

const router = express.Router();

router.use("/users", userRoute);
router.use("/products", productRoute);

export default router;
