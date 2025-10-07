import express from "express";
import { authorize } from "../middleware/auth.middleware.js";
import { transcation } from "../controller/transactions.controller.js";
import { validateTransaction } from "../middleware/validate.middleware.js";

const transactionsRouter = express.Router();

transactionsRouter.post(
  "/:senderId",
  authorize,
  validateTransaction,
  transcation
);

export default transactionsRouter;
