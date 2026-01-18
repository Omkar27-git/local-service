import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "../services/auth.service";
import User from "../models/user.model";


export const register = async (req: Request, res: Response) => {

  console.log("Register Api Hit",req.body);
  
  try {
    const { name, email, password } = req.body;

    console.log("REGISTER BODY:", req.body);

    const user = await registerUser(name, email, password);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error: any) {
    console.error("REGISTER ERROR:", error);
    res.status(400).json({
      message: error.message || "Registration failed"
    });
  }
};


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await loginUser(email, password);

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  res.json({
    message: "Login successful",
    token
  });
};



export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  const user = await User.findOne({
    emailVerificationToken: token
  });

  if (!user) {
    return res.status(400).json({
      message: "Invalid or expired verification token"
    });
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  res.json({ message: "Email verified successfully" });
};
