import mongoose, { ObjectId } from "mongoose";

export interface Post {
  _id: string;
  title: string;
  content: string;
  date: Date;
  comments: ObjectId[];
  user: ObjectId;
}

const PostSchema = new mongoose.Schema<Post>({
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
