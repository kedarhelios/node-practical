import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import { User } from "../models";

const createUser = catchAsync(async (req, res) => {
    const userBody = req.body;
    const userExists = await User.findOne({
        where: { username: userBody.username },
    });
    if (userExists) {
        throw new ApiError(400, "User already exists with same username");
    }

    const user = await User.create(userBody);
    return res.status(201).json(user);
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
    const [affectedRows, updatedUser] = await User.update(req.body, {
        where: { id: req.params.userId },
        returning: true,
    });

    if (affectedRows === 0) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(updatedUser[0]);
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
