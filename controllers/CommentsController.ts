import { Request, Response } from "express";
import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

export async function getCommentById(req: Request, res: Response) {
  const commentId = req.params.commentId;

  try {
    const comment = await CommentModel.findById(commentId);
    res.status(200).json({
      data: comment,
      status: 200,
      error: null,
      message: "Comment fetched successfully",
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

export async function getPostComments(req: Request, res: Response) {
  const postId = req.params.postId;

  try {
    const comments = await CommentModel.find({ post: postId });
    res.status(200).json({
      data: comments,
      status: 200,
      error: null,
      message: "Comments fetched successfully",
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

export async function addComment(req: Request, res: Response) {
  try {
    const postId = req.params.postId;
    const { id: userId } = req.user;
    const { content } = req.body;

    const date = new Date();
    const comment = await CommentModel.create({
      user: userId,
      content,
      date,
      post: postId,
    });
    await PostModel.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    res.status(201).json({
      data: comment,
      status: 201,
      error: null,
      message: "Comment created successfully",
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

export async function updateComment(req: Request, res: Response) {
  try {
    const commentId = req.params.postId;
    const { content } = req.body;

    const comment = await CommentModel.findByIdAndUpdate(commentId, { content }, { returnOriginal: false });

    res.status(200).json({
      data: comment,
      status: 200,
      error: null,
      message: "Comment updated successfully",
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

export async function deleteComment(req: Request, res: Response) {
  try {
    const commentId = req.params.commentId;

    const comment = await CommentModel.findByIdAndDelete(commentId, { returnOriginal: true });
    if (!comment) {
      res.status(404).json({
        data: null,
        status: 404,
        error: "Comment not found",
        message: "Error occurred",
      });
      return;
    }
    await PostModel.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });

    res.status(200).json({
      data: comment,
      status: 200,
      error: null,
      message: "Comment deleted successfully",
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
