import User from "../models/user.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const emailVerificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    provider: "local",
    isEmailVerified: false,
    emailVerificationToken
  });

  // ✅ IMPORTANT FIX: BACKEND verify URL
  const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${emailVerificationToken}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Welcome to LocalService</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  if (!user.isEmailVerified) {
    throw new Error("Please verify your email first");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};
