import express from "express";

import {
  AskTweet,
  getAllTweets,
  deleteTweet,
  voteTweet,
} from "../controllers/Tweets.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/Ask", auth, AskTweet);
router.get("/get", getAllTweets);
router.delete("/delete/:id", auth, deleteTweet);
router.patch("/vote/:id", auth, voteTweet);

export default router;
