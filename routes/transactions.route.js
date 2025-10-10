import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { transaction } from "../controller/transactions.controller.js";
import { validateTransaction } from "../middleware/validate.middleware.js";

const transactionsRouter = express.Router();

transactionsRouter.post(
  "/:senderId",
  authorize,
  validateTransaction,
  transaction
);

export default transactionsRouter;
