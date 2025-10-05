import express from "express";
import {
  validateSignup,
  validateLogin,
} from "../middleware/validate.middleware.js";
import { signup, login } from "../controller/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", validateSignup, signup);
authRouter.post("/login", validateLogin, login);

export default authRouter;
