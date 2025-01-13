import { Response, Request } from "express";
import PostModel from "../models/Post.js";
import UserModel from "../models/User.js";

export async function getPostsBySender(req: Request, res: Response) {
  const { sender } = req.query;
  try {
    const posts = await PostModel.find({ user: sender });
    res.status(200).json({
      data: posts,
      status: 200,
      error: null,
      message: "Posts fetched successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await PostModel.find();
    res.status(200).json({
      data: posts,
      status: 200,
      error: null,
      message: "Posts fetched successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}
export async function getPostById(req: Request, res: Response) {
  const { postId } = req.params;

  try {
    const post = await PostModel.findById(postId);
    res.status(200).json({
      data: post,
      status: 200,
      error: null,
      message: "Post fetched successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}

export async function addPost(req: Request, res: Response) {
  try {
    const { id: userId } = req.user;
    const { content, title } = req.body;

    const date = new Date();
    const post = await PostModel.create({
      user: userId,
      content,
      title,
      date,
      comments: [],
    });
    await UserModel.findByIdAndUpdate(userId, { $push: { posts: post._id } });

    res.status(201).json({
      data: post,
      status: 201,
      error: null,
      message: "Post created successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}

export async function updatePost(req: Request, res: Response) {
  try {
    const { postId } = req.params;
    const { content, title } = req.body;

    const post = await PostModel.findByIdAndUpdate(postId, { content, title }, { returnOriginal: false });

    res.status(200).json({
      data: post,
      status: 200,
      error: null,
      message: "Post updated successfully",
    });
  } catch (e: any) {
    res.status(400).json({
      data: null,
      status: 400,
      error: e.message,
      message: "Error occurred",
    });
  }
}
