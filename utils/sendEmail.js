import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your AyQuery Account",
    html: `<p>Your verification OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
  };
  return transporter.sendMail(mailOptions);
};
