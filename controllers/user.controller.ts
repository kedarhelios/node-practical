import ApiError from "utils/ApiError";
import catchAsync from "utils/catchAsync";
import { User } from "models";
import { Op } from "sequelize";

const createUser = catchAsync(async (req, res) => {
    const userBody = req.body;
    const userExists = await User.findOne({
        where: { username: userBody.username },
    });
    if (userExists) {
        throw new ApiError(400, "User already exists with same username");
    }

    const user = await User.create(userBody);
    const result = { ...user.get(), password: undefined };
    return res.status(201).json(result);
});

const getUsers = catchAsync(async (req, res) => {
    const result = await User.findAll();
    return res.status(200).json(result);
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
    const userExists = await User.findOne({
        where: {
            username: req.body.username,
            id: { [Op.ne]: req.params.userId },
        },
    });
    if (userExists) {
        throw new ApiError(400, "User already exists with same username");
    }

    const [affectedRows, updatedUser] = await User.update(
        {
            name: req.body.name,
            username: req.body.username,
            ...(req.body.password && { password: req.body.password }),
            updated_by: req.user.userId,
        },
        {
            where: { id: req.params.userId },
            returning: true,
        }
    );

    if (affectedRows === 0) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json({
        message: "User successfully updated",
        user: updatedUser[0],
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
