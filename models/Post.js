import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;
