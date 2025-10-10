import prisma from "../utils/prisma.js";
import { Prisma } from "@prisma/client";
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
  if (amount === undefined || amount === null || amount === "")
    return res
      .status(400)
      .json({ success: false, errMsg: "All input must be filled" });

  next();
};

// export const validateTransaction = async (req, res, next) => {
//   const { senderId } = req.params;
//   const { amount, receiverId } = req.body;
//   try {
//     const numericAmount = new Prisma.Decimal(amount);

//     if (!receiverId || !amount)
//       return res
//         .status(400)
//         .json({ success: false, errMsg: "All inputs must be filled" });

//     if (senderId === receiverId)
//       return res
//         .status(400)
//         .json({ success: false, errMsg: "You cant transact with yourself" });

//     const sender = await prisma.wallet.findUnique({ where: { id: senderId } });
//     const receiver = await prisma.wallet.findUnique({
//       where: { id: receiverId },
//     });

//     if (!sender || !receiver)
//       return res
//         .status(404)
//         .json({ success: false, errMsg: "Sender/Receiver not found" });

//     if (sender.balance.lt(numericAmount))
//       return res
//         .status(400)
//         .json({ success: false, errMsg: "Insufficient balcance" });

//     req.sender = sender;
//     req.numericAmount = numericAmount;
//     req.receiver = receiver;

//     next();
//   } catch (error) {
//     res
//       .status(500)
//       .json({ success: false, errMsg: "Error validating credentials" });
//   }
// };

export const validateTransaction = async (req, res, next) => {
  const { senderId } = req.params;
  const { amount, receiverId } = req.body;

  try {
    if (!receiverId || amount === undefined || amount === null || amount === "")
      return res
        .status(400)
        .json({ success: false, errMsg: "All inputs must be filled" });

    if (senderId === receiverId)
      return res
        .status(400)
        .json({ success: false, errMsg: "You can't transact with yourself" });

    // Safe amount conversion
    let numericAmount;
    try {
      numericAmount = new Prisma.Decimal(parseFloat(amount).toFixed(2));
    } catch {
      return res
        .status(400)
        .json({ success: false, errMsg: "Invalid amount format" });
    }

    // Fetch sender and receiver
    const sender = await prisma.wallet.findUnique({ where: { id: senderId } });
    const receiver = await prisma.wallet.findUnique({
      where: { id: receiverId },
    });

    if (!sender || !receiver)
      return res
        .status(404)
        .json({ success: false, errMsg: "Sender/Receiver not found" });

    // Check balance
    if (sender.balance.lt(numericAmount))
      return res
        .status(400)
        .json({ success: false, errMsg: "Insufficient balance" });

    // Attach to request for next middleware
    req.sender = sender;
    req.receiver = receiver;
    req.numericAmount = numericAmount;

    next();
  } catch (error) {
    console.error("Validation error:", error);
    res
      .status(500)
      .json({ success: false, errMsg: "Error validating transaction" });
  }
};
