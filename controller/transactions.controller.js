import prisma from "../utils/prisma.js";
export const transcation = async (req, res) => {
  const { senderId } = req.params;
  const { amount, receiverId } = req.body;

  try {
    const sender = await prisma.wallet.findUnique({ where: { id: senderId } });
    const receiver = await prisma.wallet.findUnique({
      where: { id: receiverId },
    });

    if (!receiver || !sender)
      return res
        .status(404)
        .json({ success: false, errMsg: "Sender/Receiver not found" });

    //Update both sender and receiver
    const updatedSender = await prisma.wallet.update({
      where: { id: senderId },
      data: {
        balance: updatedSender.balance - amount,
      },
    });
    const updatedReceiver = await prisma.wallet.update({
      where: { id: receiverId },
      data: {
        balance: updatedReceiver.balance + amount,
      },
    });

    //Create a transaction

    const transcation = await prisma.transactions.create({
      data: {
        amount: amount,
        senderId: senderId,
        receiverId: receiverId,
      },
    });

    res.status(201).json({ success: true, transcation });
  } catch (error) {
    res.status(500).json({ success: false, errMsg: "Error in transacting" });
  }
};
