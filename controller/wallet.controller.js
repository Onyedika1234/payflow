import prisma from "../utils/prisma.js";

export const createWallet = async (req, res) => {
  const { id } = req.params;
  try {
    const wallet = await prisma.wallet.create({
      data: {
        ownerId: id,
      },
    });

    res.status(201).json({ success: true, wallet });
  } catch (error) {
    res.status(500).json({ success: false, errMsg: error.message });
  }
};

export const getWallet = async (req, res) => {
  const { id } = req.params;
  try {
    const wallet = await prisma.wallet.findUnique({
      where: { id },
      include: { owner: true },
    });
    res.status(200).json({ success: true, wallet });
  } catch (error) {
    res.status(500).json({ success: false, errMsg: error.message });
  }
};

export const deposit = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const wallet = await prisma.wallet.findUnique({ where: { id } });
    if (!wallet)
      return res
        .status(404)
        .json({ success: false, errMsg: "Wallet not found" });

    const newBalance = wallet.balance + amount;

    const updatedWallet = await prisma.wallet.update({
      where: { id },
      data: {
        balance: newBalance,
      },
    });

    res.status(201).json({ success: true, updatedWallet });
  } catch (error) {
    res.status(500).json({ success: false, errMsg: "Error depositing" });
  }
};
