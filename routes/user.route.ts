import express from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from "../controllers/user.controller";
import { createUserSchema } from "../validators/user.validator";
import validate from "../utils/validate";

const router = express.Router();

router.route("/").get(getUsers).post(validate(createUserSchema), createUser);

router.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
