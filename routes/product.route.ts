import express from "express";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from "../controllers/product.controller";
import validate from "../utils/validate";
import {
    createProductSchema,
    updateProductSchema,
} from "../validators/product.validator";
import { authenticate } from "../utils/authenticate";

const router = express.Router();
router.use(authenticate);

router
    .route("/")
    .get(getProducts)
    .post(validate(createProductSchema), createProduct);

router
    .route("/:productId")
    .get(getProduct)
    .patch(validate(updateProductSchema), updateProduct)
    .delete(deleteProduct);

export default router;
