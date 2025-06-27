import express from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from "../controllers/product.controller";
import validate from "../utils/validate";
import { createProductSchema } from "../validators/product.validator";

const router = express.Router();

router
    .route("/")
    .get(getProducts)
    .post(validate(createProductSchema), createProduct);

router
    .route("/:productId")
    .get(getProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

export default router;
