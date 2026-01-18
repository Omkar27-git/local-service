import { Resend } from "resend"; 

const resend = new Resend(process.env.RESEND_API_KEY!);

export const sendVerificationEmail = async(
    email:string,
    token:string
)=>{
    const verifyUrl = 
    `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to:email,
        subject:"Verify your email",
        html: `
      <h3>Verify your email</h3>
      <p>Click the link below to verify your account:</p>
      <a href="${verifyUrl}">Verify Email</a>
    `
    })
}