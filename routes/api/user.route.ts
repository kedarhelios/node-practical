import express from "express";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from "../../controllers/user.controller";
import {
    createUserSchema,
    updateUserSchema,
} from "../../validators/user.validator";
import validate from "../../utils/validate";
import { authenticate } from "../../utils/authenticate";

const router = express.Router();
router.use(authenticate);

router.route("/").get(getUsers).post(validate(createUserSchema), createUser);

router
    .route("/:userId")
    .get(getUser)
    .patch(validate(updateUserSchema), updateUser)
    .delete(deleteUser);

export default router;
