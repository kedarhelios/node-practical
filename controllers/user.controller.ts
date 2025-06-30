import { Op } from "sequelize";

import ApiError from "utils/ApiError";
import catchAsync from "utils/catchAsync";
import { User } from "models";

const createUser = catchAsync(async (req, res) => {
    const userBody = req.body;
    const userExists = await User.findOne({
        where: { username: userBody.username },
    });
    if (userExists) {
        throw new ApiError(400, "User already exists with same username");
    }

    const user = await User.create({
        name: userBody.name,
        username: userBody.username,
        password: userBody.password,
        created_by: req.user.userId,
        updated_by: req.user.userId,
    });
    const result = { ...user.get(), password: undefined };
    return res.status(201).json(result);
});

const getUsers = catchAsync(async (req, res) => {
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
            { username: { [Op.like]: `%${search}%` } },
        ],
    };

    const validSortFields = ["name", "username"];
    const validOrder = order.toUpperCase() === "ASC" ? "ASC" : "DESC";
    const sortField = validSortFields.includes(sortBy) ? sortBy : "name";

    const result = await User.findAndCountAll({
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

const getUser = catchAsync(async (req, res) => {
    const user = await User.findOne({
        where: { id: req.params.userId },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(user);
});

const updateUser = catchAsync(async (req, res) => {
    console.log("im here");
    const userExists = await User.findOne({
        where: {
            username: req.body.username,
            id: { [Op.ne]: req.params.userId },
        },
    });
    if (userExists) {
        throw new ApiError(400, "User already exists with same username");
    }

    const user = await User.findOne({
        where: { id: req.params.userId },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.name = req.body?.name;
    user.username = req.body?.username;
    user.updated_by = req.user.userId;
    if (req.body?.password) {
        user.password = req.body.password;
    }

    await user.save();

    return res.status(200).json({
        message: "User successfully updated",
        user: user.toJSON(),
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const deletedRows = await User.destroy({
        where: { id: req.params.userId },
    });

    if (deletedRows === 0) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json({ message: "User successfully deleted" });
});

export { createUser, getUsers, getUser, updateUser, deleteUser };
