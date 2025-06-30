import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { Product } from "../models";

const createProduct = catchAsync(async (req, res) => {
    const productBody = req.body;
    const product_number = (await Product.max("product_number")) as number;

    const product = await Product.create({
        name: productBody.name,
        price: productBody.price,
        product_number: product_number + 1,
        created_by: req.user.userId,
        updated_by: req.user.userId,
    });
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
    const [affectedRows, updatedProduct] = await Product.update(
        {
            name: req.body.name,
            price: req.body.price,
            updated_by: req.user.userId,
        },
        {
            where: { id: req.params.productId },
            returning: true,
        }
    );

    if (affectedRows === 0) {
        throw new ApiError(404, "Product not found");
    }

    return res.status(200).json({
        message: "Product successfully updated",
        user: updatedProduct[0],
    });
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
