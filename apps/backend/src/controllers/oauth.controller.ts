import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

// STEP 1: redirect to Google
export const googleSignIn = passport.authenticate("google", {
  scope: ["profile", "email"]
});

// STEP 2: Google callback
export const googleCallback = async (req: Request, res: Response) => {
  const googleUser = (req as any).user;

  if (!googleUser) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=google`);
  }

  // ✅ USER IS CREATED / FOUND HERE
  let user = await User.findOne({ email: googleUser.email });

  if (!user) {
    user = await User.create({
      name: googleUser.name,
      email: googleUser.email,
      provider: "google",
      isEmailVerified: true
    });
  }

  // ✅ ISSUE JWT
  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  // ✅ REDIRECT TO FRONTEND WITH TOKEN
  res.redirect(
    `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
  );
};
