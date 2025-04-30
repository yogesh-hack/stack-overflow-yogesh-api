import mongoose from "mongoose";
import Tweets from "../models/Tweets.js";

export const postComment = async (req, res) => {
  const { id: _id } = req.params;
  const { noOfComments, commentBody, userComments } = req.body;
  const userId = req.userId;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Tweet unavailable...");
  }

  updateNoOfTweets(_id, noOfComments);
  try {
    const updatedTweet = await Tweets.findByIdAndUpdate(_id, {
      $addToSet: { comments: [{ commentBody, userComments, userId }] },
    });
    res.status(200).json(updatedTweet);
  } catch (error) {
    res.status(400).json("error in updating");
  }
};

const updateNoOfTweets = async (_id, noOfComments) => {
  try {
    await Tweets.findByIdAndUpdate(_id, {
      $set: { noOfComments: noOfComments },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentId, noOfComments } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Tweet unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).send("Comment unavailable...");
  }
  updateNoOfTweets(_id, noOfComments);
  try {
    await Tweets.updateOne(
      { _id },
      { $pull: { comments: { _id: commentId } } }
    );
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};
