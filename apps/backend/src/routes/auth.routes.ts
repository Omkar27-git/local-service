import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  register,
  login,
  logout,
  verifyEmail
} from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// ✅ Email verification
router.get("/verify-email", verifyEmail);

// ✅ Used by ProtectedRoute
router.get("/me", protect, (_req, res) => {
  res.json({ ok: true });
});

// ---------- GOOGLE OAUTH ----------
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:`${process.env.FRONTEND_URL}/login`
  }),
  (req: any, res) => {
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

export default router;
