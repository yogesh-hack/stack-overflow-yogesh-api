import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import users from "../models/auth.js";
import { sendOTPEmail } from "../utils/sendEmail.js";

// In-memory storage for temporary signups (consider Redis or DB in prod)
const tempUsers = new Map(); // key: email, value: { name, email, password, otp, otpExpires }

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Check if OTP already sent
    if (tempUsers.has(email)) {
      return res.status(400).json({ message: "OTP already sent. Please verify." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    tempUsers.set(email, {
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await sendOTPEmail(email, otp);

    res.status(200).json({
      message: "OTP sent to email. Please verify to complete signup.",
      email,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, fullOtp } = req.body;
  console.log("Received OTP verification request:", { email, fullOtp });
  try {
    const tempUser = tempUsers.get(email);

    if (!tempUser) {
      return res.status(404).json({ message: "No pending signup found." });
    }

    if (tempUser.otp !== fullOtp || tempUser.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    const newUser = await users.create({
      name: tempUser.name,
      email: tempUser.email,
      password: tempUser.password,
      isVerified: true,
    });

    tempUsers.delete(email); // Cleanup after successful verification

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Email verified and account created successfully.",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    if (!existingUser.isVerified) {
      return res.status(403).json({ message: "Email not verified." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong..." });
  }
};
