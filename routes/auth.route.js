import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateSignup } from "../middleware/validate.middleware.js";

const authRouter = express.Router();

authRouter.post("/signup", validateSignup, (req, res) => {});

authRouter.post("/login", (res, req) => {});

export default authRouter;
