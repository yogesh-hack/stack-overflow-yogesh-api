import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import tweetsRoutes from "./routes/Tweets.js";
import connectDB from "./connectMongoDb.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from "public"
app.use(express.static(path.join(__dirname, "public")));

// Route to serve main.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "main.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Register.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "Register.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "About.html"));
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/tweets", tweetsRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
