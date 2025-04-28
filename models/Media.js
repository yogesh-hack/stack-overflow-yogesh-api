import mongoose from "mongoose";

const MediaSchema = mongoose.Schema({
  mediaTitle: { type: String, required: "media must have a title" },
  mediaBody: { type: String, required: "media must have a body" },
  mediaImage: { type: [String], required: "media must have a tags" },
  noOfAnswers: { type: Number, default: 0 },
  likes: { type: [String], default: [] },
  dislike: { type: [String], default: [] },
  userPosted: { type: String, required: "media must have an author" },
  userId: { type: String },
  askedOn: { type: Date, default: Date.now },
  comment: [
    {
      commentBody: String,
      usercomment: String,
      userId: String,
      commentOn: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model("media", MediaSchema);
