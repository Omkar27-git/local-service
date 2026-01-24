import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

/**
 * Generic email sender
 */
export const sendEmail = async ({
  to,
  subject,
  html
}: SendEmailParams) => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY missing");
  }

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "onboarding@resend.dev",
    to,
    subject,
    html
  });
};

/**
 * Email verification (optional – can use later)
 */
export const sendVerificationEmail = async (
  email: string,
  token: string
) => {
  const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await sendEmail({
    to: email,
    subject: "Verify your email",
    html: `
      <h3>Email Verification</h3>
      <p>Please click the link below to verify your email:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `
  });
};
