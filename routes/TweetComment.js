import express from "express";

import { postComment, deleteComment } from "../controllers/TweetComment.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.patch("/post/:id", auth, postComment);
router.patch("/delete/:id", auth, deleteComment);

export default router;
