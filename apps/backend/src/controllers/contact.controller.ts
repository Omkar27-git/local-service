import { Request, Response } from "express";
import { sendEmail } from "../utils/email";

export const contactHandler = async (
  req: Request,
  res: Response
) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  await sendEmail({
    to: process.env.EMAIL_FROM!,
    subject: "New Contact Message",
    html: `
      <h3>New Contact Request</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Message:</b> ${message}</p>
    `
  });

  res.json({ message: "Message sent successfully" });
};
