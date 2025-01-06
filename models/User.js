import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
});

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
