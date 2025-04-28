import mongoose from "mongoose";

const TweetSchema = mongoose.Schema({
  tweetTitle: { type: String, required: "tweet must have a title" },
  tweetBody: { type: String, required: "tweet must have a body" },
  tweetTags: { type: [String], required: "tweet must have a tags" },
  like: { type: [String], default: [] },
  userPosted: { type: String, required: "tweet must have an author" },
  userId: { type: String },
  askedOn: { type: Date, default: Date.now },
  comments: [
    {
      commentBody: String,
      userComments: String,
      userId: String,
      commentOn: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("tweet", TweetSchema);
