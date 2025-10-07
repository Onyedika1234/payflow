import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user)
      return res.status(404).json({ success: false, err: "User not found" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const updateUser = await prisma.user.update({
      where: { id },
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json({ success: true, updateUser });
  } catch (error) {
    res.status(500).json({ success: false, err: "Error in updating" });
  }
};
