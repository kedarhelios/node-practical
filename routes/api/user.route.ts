import express from "express";
import csurf from "csurf";

import validate from "utils/validate";
import { authenticate } from "utils/authenticate";
import { createUserSchema, updateUserSchema } from "validators/user.validator";
import {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} from "controllers/user.controller";

const router = express.Router();
const csrfProtection = csurf({ cookie: true });

router.use(authenticate);

router
    .route("/")
    .get(getUsers)
    .post(csrfProtection, validate(createUserSchema), createUser);

router
    .route("/:userId")
    .get(getUser)
    .patch(csrfProtection, validate(updateUserSchema), updateUser)
    .delete(csrfProtection, deleteUser);

export default router;
