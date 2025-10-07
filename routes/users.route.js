import express from "express";
import { updateUser } from "../controller/users.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
import { validateUpadateUser } from "../middleware/validate.middleware.js";

const userRouter = express.Router();

userRouter.patch("/:id", authorize, validateUpadateUser, updateUser);

export default userRouter;
