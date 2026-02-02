import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 🍪 READ TOKEN FROM COOKIE (NOT HEADER)
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      message: "Not authorized, no token"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as any;

    // ✅ attach user id to request
    (req as any).userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
