import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, login, verifyEmail } from "../controllers/auth.controller";
import User from "../models/user.model";

const router = Router();

// Normal auth
router.post("/register", register);
router.post("/login", login);

// =====================
// GOOGLE OAUTH
// =====================

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`
  }),
  async (req: any, res) => {
    const user = req.user;

    // Issue JWT (same as normal login)
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Redirect to frontend with token
    res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}`
    );
  }
);

// Email verification
router.get("/verify-email", verifyEmail);

export default router;
