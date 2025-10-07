import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/users.route.js";
import walletRouter from "./routes/wallet.route.js";
import transactionsRouter from "./routes/transactions.route.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.use("/wallets", walletRouter);

app.use("/transactions", transactionsRouter);

app.listen(process.env.PORT, () => console.log("Server running"));

app.get("/", (req, res) => res.send("this is coming from the server"));
