import express from "express";
import csurf from "csurf";

import { login } from "controllers/auth.controller";
import validate from "utils/validate";
import { loginSchema } from "validators/auth.validator";

const router = express.Router();
const csrfProtection = csurf({ cookie: true });

router.use(csrfProtection);

router.post("/login", validate(loginSchema), login);
router.post("/logout", (_req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
});

export default router;
