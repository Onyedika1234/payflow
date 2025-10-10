import prisma from "../utils/prisma.js";
import { Prisma } from "@prisma/client";
export const transaction = async (req, res) => {
  const { senderId } = req.params;
  const { receiverId } = req.body;

  const numericAmount = req.numericAmount;

  try {
    const [updatedSender, updatedReceiver, transaction] =
      await prisma.$transaction([
        prisma.wallet.update({
          where: { id: senderId },
          data: {
            balance: { decrement: numericAmount },
          },
        }),
        prisma.wallet.update({
          where: { id: receiverId },
          data: { balance: { increment: numericAmount } },
        }),
        prisma.transactions.create({
          data: {
            amount: numericAmount,
            senderId,
            receiverId,
          },
        }),
      ]);
    res
      .status(201)
      .json({ success: true, transaction, updatedSender, updatedReceiver });
  } catch (error) {
    res.status(500).json({ success: false, errMsg: "Error in transacting" });
  }
};
