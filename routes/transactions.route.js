import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import {
  getCreditTransactions,
  getDebitTransactions,
  transaction,
} from "../controller/transactions.controller.js";
import { validateTransaction } from "../middleware/validate.middleware.js";

const transactionsRouter = express.Router();

// New transcations
transactionsRouter.post(
  "/:senderId",
  authorize,
  validateTransaction,
  transaction
);
// get credit transcations
transactionsRouter.get("/:id/credit", authorize, getCreditTransactions);

transactionsRouter.get("/:id/debit", authorize, getDebitTransactions);

export default transactionsRouter;
