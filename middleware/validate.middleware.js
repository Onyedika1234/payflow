import prisma from "../utils/prisma.js";
export const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, err: "All fields are required" });
  }
  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ success: true, err: "All fields are required" });
  next();
};

export const validateUpadateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ success: false, err: "All fields are required" });

  next();
};

export const validateAmount = (req, res, next) => {
  const { amount } = req.body;
  if (!amount)
    return res
      .status(400)
      .json({ success: false, errMsg: "All input must be filled" });

  next();
};

export const validateTransaction = async (req, res, next) => {
  const { senderId } = req.params;
  const { receiverId, amount } = req.body;

  if (!receiverId || !amount)
    return res
      .status(400)
      .json({ success: false, errMsg: "All inputs must be filled" });

  const sender = await prisma.wallet.findUnique({ where: { id: senderId } });

  if (!sender)
    return res.status(404).json({ success: false, errMsg: "Sender not found" });

  if (sender.balance === 0 && sender.balance - amount < 0)
    return res
      .status(400)
      .json({ success: false, errMsg: "Insufficient balcance" });

  next();
};
