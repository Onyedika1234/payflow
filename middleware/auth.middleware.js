import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../utils/prisma.js";
dotenv.config();
export const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({ success: false, err: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user)
      return res.status(401).json({ success: false, err: "Unauthorized" });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ success: false, err: "Unauthorized" });
  }
};
