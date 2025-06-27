import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { Product } from "../models";

const createProduct = catchAsync(async (req, res) => {
    const productBody = req.body;

    const productExists = await Product.findOne({
        where: { product_number: productBody.product_number },
    });

    if (productExists) {
        throw new ApiError(
            400,
            "Product already exists with the same product number"
        );
    }

    const product = await Product.create(productBody);
    return res.status(201).json(product);
});

const getProducts = catchAsync(async (req, res) => {
    const products = await Product.findAll();
    return res.status(200).json(products);
});

const getProduct = catchAsync(async (req, res) => {
    const product = await Product.findOne({
        where: { id: req.params.productId },
    });

    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(product);
});

const updateProduct = catchAsync(async (req, res) => {
    const [affectedRows, updatedProduct] = await Product.update(req.body, {
        where: { id: req.params.productId },
        returning: true,
    });

    if (affectedRows === 0) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json(updatedProduct[0]);
});

const deleteProduct = catchAsync(async (req, res) => {
    const deletedRows = await Product.destroy({
        where: { id: req.params.productId },
    });

    if (deletedRows === 0) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json({ message: "Product successfully deleted" });
});

export { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
