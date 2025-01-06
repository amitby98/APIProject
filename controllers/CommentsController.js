import CommentModel from "../models/Comment.js";
import PostModel from "../models/Post.js";

export async function getCommentById(req, res) {
  const commentId = req.params.commentId;

  try {
    const comment = await CommentModel.findById(commentId);
    return res.status(200).json({
      data: comment,
      status: 200,
      error: null,
      message: "Comment fetched successfully",
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

export async function getPostComments(req, res) {
  const postId = req.params.postId;

  try {
    const comments = await CommentModel.find({ post: postId });
    return res.status(200).json({
      data: comments,
      status: 200,
      error: null,
      message: "Comments fetched successfully",
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

export async function addComment(req, res) {
  try {
    const postId = req.params.postId;
    const { userId, content } = req.body;

    const date = new Date();
    const comment = await CommentModel.create({
      user: userId,
      content,
      date,
      post: postId,
    });
    await PostModel.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    return res.status(201).json({
      data: comment,
      status: 201,
      error: null,
      message: "Comment created successfully",
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

export async function updateComment(req, res) {
  try {
    const commentId = req.params.postId;
    const { content } = req.body;

    const comment = await CommentModel.findByIdAndUpdate(commentId, { content }, { returnOriginal: false });

    return res.status(200).json({
      data: comment,
      status: 200,
      error: null,
      message: "Comment updated successfully",
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

export async function deleteComment(req, res) {
  try {
    const commentId = req.params.commentId;

    const comment = await CommentModel.findByIdAndDelete(commentId, { returnOriginal: true });
    await PostModel.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });

    return res.status(200).json({
      data: comment,
      status: 200,
      error: null,
      message: "Comment deleted successfully",
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
