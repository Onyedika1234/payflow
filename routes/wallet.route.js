import express from "express";
import prisma from "../utils/prisma.js";
import {
  createWallet,
  getWallet,
  deposit,
} from "../controller/wallet.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
import { validateAmount } from "../middleware/validate.middleware.js";

const walletRouter = express.Router();

walletRouter.post("/:id", authorize, createWallet);

walletRouter.get("/:id", authorize, getWallet);

walletRouter.post("/:id/deposit", authorize, validateAmount, deposit);

export default walletRouter;
