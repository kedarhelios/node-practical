import express from "express";
import userRoute from "./user.route";
import productRoute from "./product.route";
import authRoute from "./auth.route";

const router = express.Router();

router.use("/users", userRoute);
router.use("/products", productRoute);
router.use("/auth", authRoute);

export default router;
