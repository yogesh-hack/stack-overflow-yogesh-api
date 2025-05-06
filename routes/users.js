import express from "express";

import { login, resendOtp, signup,verifyOtp } from "../controllers/auth.js";
import { getAllUsers, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);

export default router;
