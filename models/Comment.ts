import mongoose, { ObjectId } from "mongoose";

export interface Comment {
  _id: string;
  content: string;
  date: Date;
  post: ObjectId;
  user: ObjectId;
}
const CommentSchema = new mongoose.Schema<Comment>({
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
