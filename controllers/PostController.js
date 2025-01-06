import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";

export async function getPostsBySender(req, res) {
  const { sender } = req.query;
  try {
    const posts = await PostModel.find({ user: sender });
    return res.status(200).json({
      data: posts,
      status: 200,
      error: null,
      message: "Posts fetched successfully",
    });
  } catch (e) {
    return res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}

export async function getAllPosts(req, res) {
  try {
    const posts = await PostModel.find();
    return res.status(200).json({
      data: posts,
      status: 200,
      error: null,
      message: "Posts fetched successfully",
    });
  } catch (e) {
    return res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}
export async function getPostById(req, res) {
  const { postId } = req.params;

  try {
    const post = await PostModel.findById(postId);
    return res.status(200).json({
      data: post,
      status: 200,
      error: null,
      message: "Post fetched successfully",
    });
  } catch (e) {
    return res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}

export async function addPost(req, res) {
  try {
    const { userId, content, title } = req.body;

    const date = new Date();
    const post = await PostModel.create({
      user: userId,
      content,
      title,
      date,
      comments: [],
    });
    await UserModel.findByIdAndUpdate(userId, { $push: { posts: post._id } });

    return res.status(201).json({
      data: post,
      status: 201,
      error: null,
      message: "Post created successfully",
    });
  } catch (e) {
    return res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}

export async function updatePost(req, res) {
  try {
    const { postId } = req.params;
    const { content, title } = req.body;

    const post = await PostModel.findByIdAndUpdate(postId, { content, title }, { returnOriginal: false });

    return res.status(200).json({
      data: post,
      status: 200,
      error: null,
      message: "Post updated successfully",
    });
  } catch (e) {
    return res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}
