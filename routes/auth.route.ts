import express from "express";
import { login } from "../controllers/auth.controller";
import validate from "../utils/validate";
import { loginSchema } from "../validators/auth.validator";

const router = express.Router();

router.post("/login", validate(loginSchema), login);
router.post("/logout", (_req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

export default router;
