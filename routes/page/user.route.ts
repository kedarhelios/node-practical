import express, { Request, Response } from "express";
import csurf from "csurf";

import { User } from "models";
import { authenticate } from "utils/authenticate";

const router = express.Router();
const csrfProtection = csurf({ cookie: true });

router.use(authenticate);

router.get("/", async (req: Request, res: Response) => {
    res.render("users/users", { user: req.user });
});

router.use(csrfProtection);

router.get("/add", (req: Request, res: Response) => {
    try {
        res.render("users/add_user", {
            user: req.user,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.log(error);
    }
});
router.get("/edit/:userId", async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.userId);
        const isCurrentUser = req.user.userId === user.id;
        res.render("users/edit_user", {
            user: req.user,
            editingUser: user,
            errors: {},
            isCurrentUser,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;
