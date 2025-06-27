import express from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct);

router
    .route("/:productId")
    .get(getProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

export default router;
