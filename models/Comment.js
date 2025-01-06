import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "posts" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const CommentModel = mongoose.model("comments", CommentSchema);

export default CommentModel;
