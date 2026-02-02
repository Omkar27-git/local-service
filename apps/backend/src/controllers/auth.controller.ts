import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/user.model";
import { registerUser, loginUser } from "../services/auth.service";
import { sendEmail } from "../utils/sendEmail";

/**
 * REGISTER
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await registerUser(name, email, password);

    // 🔐 Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    user.emailVerificationToken = verificationToken;
    user.isEmailVerified = false;
    await user.save();

    // 📧 Send verification email
    const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${verificationToken}`;

    await sendEmail({
      to: user.email,
      subject: "Verify your email",
      html: `
        <h3>Welcome to LocalService 👋</h3>
        <p>Please verify your email to activate your account.</p>
        <a href="${verifyUrl}">Verify Email</a>
      `
    });

    res.status(201).json({
      message: "Registration successful. Please verify your email."
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * LOGIN
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    // ❌ Block login if email not verified
    if (!user.isEmailVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email first" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure:false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

/**
 * VERIFY EMAIL
 */
export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Verification token missing" });
  }

  const user = await User.findOne({ emailVerificationToken: token });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  // ✅ REDIRECT TO FRONTEND PAGE
  res.redirect(`${process.env.FRONTEND_URL}/email-verified`);
};


/**
 * LOGOUT
 */
export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};
