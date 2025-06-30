import express from "express";
import csurf from "csurf";

import validate from "utils/validate";
import { authenticate } from "utils/authenticate";
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from "controllers/product.controller";
import {
    createProductSchema,
    updateProductSchema,
} from "validators/product.validator";

const router = express.Router();
const csrfProtection = csurf({ cookie: true });

router.use(authenticate);

router
    .route("/")
    .get(getProducts)
    .post(csrfProtection, validate(createProductSchema), createProduct);

router
    .route("/:productId")
    .get(getProduct)
    .patch(csrfProtection, validate(updateProductSchema), updateProduct)
    .delete(csrfProtection, deleteProduct);

export default router;
