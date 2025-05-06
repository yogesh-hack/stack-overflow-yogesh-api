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

export const sendOTPEmail = async (name,email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your AyQuery Account",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px;">
      <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 10px; padding: 30px; box-shadow: 0 5px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; font-size: 40px; margin-bottom: 20px;">🔒</div>
        <div style="background-color: #1d4ed8; color: white; padding: 20px; border-radius: 8px; text-align: center;">
          <h2 style="font-size: 20px; font-weight: bold;">--- AyQuery ---</h2>
          <p style="margin-top: 5px;">Thanks for signing up!</p>
          <p style="margin-top: 15px; font-size: 16px;">Please Verify Your Email Address</p>
          <div style="font-size: 24px; margin-top: 10px;">📩</div>
        </div>
        <div style="text-align: center; margin-top: 30px;">
          <h3 style="font-size: 18px; font-weight: 600;">Hello, ${name}</h3>
          <p style="margin: 10px 0;">Your One-Time Password (OTP) for verification is:</p>
          <div style="border: 2px dashed #60a5fa; border-radius: 6px; padding: 12px; font-size: 24px; font-weight: bold; color: #2563eb;">
            ${otp}
          </div>
          <p style="font-size: 14px; color: #555; margin-top: 15px;">
            Please use this OTP to complete your verification. The OTP is valid for the next 10 minutes.
          </p>
          <a href="#" style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 20px;">
            Verify Now
          </a>
          <p style="font-size: 12px; color: #999; margin-top: 20px;">
            If you did not request this OTP, please <a href="#" style="color: #2563eb; text-decoration: underline;">contact us</a> immediately.
          </p>
          <p style="font-size: 14px; color: #555; margin-top: 15px;">
            Thank you,<br>The AyQuery Team
          </p>
        </div>
      </div>
    </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

