import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answers.js";
import tweetcommentRoutes from "./routes/TweetComment.js";
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

app.use("/api/user", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/tweetcomment", tweetcommentRoutes);
app.use("/api/tweets", tweetsRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
