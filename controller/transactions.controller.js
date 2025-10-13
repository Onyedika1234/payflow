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

// Get all credit transcations of a user
export const getCreditTransactions = async (req, res) => {
  const { id } = req.params;
  try {
    const userTransactions = await prisma.transactions.findMany({
      where: {
        receiverId: id,
      },
    });
    res.status(200).json({ success: true, userTransactions });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, errMsg: "Error in getting transactions" });
  }
};

// Get all debit transcations of a user

export const getDebitTransactions = async (req, res) => {
  const { id } = req.params;
  try {
    const userTransactions = await prisma.transactions.findMany({
      where: {
        senderId: id,
      },
    });
    res.status(200).json({ success: true, userTransactions });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, errMsg: "Error in getting transactions" });
  }
};
