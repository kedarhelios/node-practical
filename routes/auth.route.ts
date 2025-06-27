import express from "express";
import { login } from "../controllers/auth.controller";
import validate from "../utils/validate";
import { loginSchema } from "../validators/auth.validator";

const router = express.Router();

router.route("/login").post(validate(loginSchema), login);

export default router;
