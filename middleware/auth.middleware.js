import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../utils/prisma.js";
dotenv.config();
export const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ success: false, err: "Unauthorized: No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user)
      return res
        .status(401)
        .json({ success: false, err: "Unauthorized: User not found" });

    req.user = user;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, err: "Token expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, err: "Invalid token" });
    } else {
      return res.status(500).json({ success: false, err: "Server error" });
    }
  }
};
