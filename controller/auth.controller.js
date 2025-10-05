import prisma from "../utils/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist)
      return res
        .status(400)
        .json({ success: false, err: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: `Error creating account: ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      res
        .status(404)
        .json({ success: false, err: "User not found, create account." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      res.status(400).json({ success: false, err: "Invalid Password" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_EXPIRES_IN);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, err: `Error logging in: ${error.message}` });
  }
};
