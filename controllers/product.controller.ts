import { Op } from "sequelize";

import ApiError from "utils/ApiError";
import catchAsync from "utils/catchAsync";
import { Product } from "models";

const createProduct = catchAsync(async (req, res) => {
    const productBody = req.body;
    const product_number = (await Product.max("product_number")) as number;

    const product = await Product.create({
        name: productBody.name,
        product_number: product_number + 1,
        created_by: req.user.userId,
        updated_by: req.user.userId,
    });
    return res.status(201).json(product);
});

const getProducts = catchAsync(async (req, res) => {
    const {
        page = "1",
        limit = "10",
        search = "",
        sortBy = "name",
        order = "ASC",
    } = req.query as unknown as {
        page: string;
        limit: string;
        search: string;
        sortBy: string;
        order: string;
    };

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const searchCondition = {
        [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { product_number: { [Op.like]: `%${search}%` } },
        ],
    };

    const validSortFields = ["name", "product_number"];
    const validOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";
    const sortField = validSortFields.includes(sortBy)
        ? sortBy
        : "product_number";

    const result = await Product.findAndCountAll({
        where: searchCondition,
        limit: parseInt(limit),
        offset,
        order: [[sortField, validOrder]],
    });

    return res.status(200).json({
        data: result.rows,
        pagination: {
            total: result.count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(result.count / parseInt(limit)),
        },
    });
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
