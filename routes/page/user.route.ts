import express, { Request, Response } from "express";

import { User } from "models";
import { authenticate } from "utils/authenticate";

const router = express.Router();
router.use(authenticate);

router.get("/", async (req: Request, res: Response) => {
    const users = await User.findAll({
        order: [["username", "ASC"]],
    });

    res.render("users/users", { users, user: req.user });
});
router.get("/add", (req: Request, res: Response) => {
    try {
        res.render("users/add_user", { user: req.user });
    } catch (error) {
        console.log(error);
    }
});
router.get("/edit/:userId", async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.userId);
        const isCurrentUser = req.user.userId === user.id;
        res.render("users/edit_user", { user, errors: {}, isCurrentUser });
    } catch (error) {
        console.log(error);
    }
});

export default router;
