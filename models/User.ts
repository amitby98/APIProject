import mongoose, { ObjectId } from "mongoose";
import bcrypt from "bcrypt";

export interface User {
  _id: string;
  full_name: string;
  email: string;
  password: string;
  posts: ObjectId[];
  comparePassword: (password: string) => boolean;
}

const UserSchema = new mongoose.Schema<User>({
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

UserSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password!, 10);
  }
});

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};
const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
