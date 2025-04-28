import Tweets from "../models/Tweets.js";
import mongoose from "mongoose";

export const AskTweet = async (req, res) => {
  const postTweetData = req.body;
  const userId = req.userId;
  const postTweet = new Tweets({ ...postTweetData, userId });
  try {
    await postTweet.save();
    res.status(200).json("Posted a Tweet successfully");
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new Tweet");
  }
};

export const getAllTweets = async (req, res) => {
  try {
    const TweetList = await Tweets.find().sort({ askedOn: -1 });
    res.status(200).json(TweetList);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTweet = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Tweet unavailable...");
  }

  try {
    await Tweets.findByIdAndRemove(_id);
    res.status(200).json({ message: "successfully deleted..." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const voteTweet = async (req, res) => {
  const { id: _id } = req.params;
  const { value } = req.body;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Tweet unavailable...");
  }

  try {
    const Tweet = await Tweets.findById(_id);
    const upIndex = Tweet.upVote.findIndex((id) => id === String(userId));

    if (value === "like") {
      if (upIndex === -1) {
        Tweet.upVote.push(userId);
      } else {
        Tweet.upVote = Tweet.upVote.filter((id) => id !== String(userId));
      }
    } 
    await Tweets.findByIdAndUpdate(_id, Tweet);
    res.status(200).json({ message: "like successfully..." });
  } catch (error) {
    res.status(404).json({ message: "id not found" });
  }
};
