import { Request, Response } from "express";
import { Auth } from "@auth/core";
import Google from "@auth/core/providers/google";
import { Request as FetchRequest } from "undici";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

// STEP 1: Redirect to Google
export const googleSignIn = async (req: Request, res: Response) => {
  const fetchReq = new FetchRequest(
    `${process.env.BASE_URL}${req.originalUrl}`,
    {
      method: req.method,
      headers: req.headers as any
    }
  );

  const response = await Auth(fetchReq as any, {
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
    secret: process.env.AUTH_SECRET!,
    trustHost: true
  });

  if (response.status === 302) {
    return res.redirect(response.headers.get("location")!);
  }

  res.status(400).json({ message: "Redirect failed" });
};

// STEP 2: Handle callback + issue JWT
export const googleCallback = async (req: Request, res: Response) => {
  const fetchReq = new FetchRequest(
    `${process.env.BASE_URL}${req.originalUrl}`,
    {
      method: req.method,
      headers: req.headers as any
    }
  );

  const response = await Auth(fetchReq as any, {
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
    secret: process.env.AUTH_SECRET!,
    trustHost: true
  });

  const profile = (response as any)?.auth?.user;

  if (!profile?.email) {
    return res.status(401).json({ message: "Google OAuth failed" });
  }

  let user = await User.findOne({ email: profile.email });

  if (!user) {
    user = await User.create({
      name: profile.name,
      email: profile.email,
      provider: "google"
    });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  res.json({ token });
};
