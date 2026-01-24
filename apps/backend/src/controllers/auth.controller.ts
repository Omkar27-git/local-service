import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { registerUser, loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    await registerUser(name, email, password);

    res.status(201).json({
      message: "Registration successful. Please verify your email."
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  res.redirect(`${process.env.FRONTEND_URL}/login`);
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};
