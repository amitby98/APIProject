import express from "express";
import * as CommentsController from "../controllers/CommentsController";
import authMiddleware from "../auth.middleware";
const router = express.Router();

router.post("/:postId", authMiddleware, CommentsController.addComment);
router.put("/:commentId", authMiddleware, CommentsController.updateComment);
router.get("/:postId", CommentsController.getPostComments);
router.get("/single/:commentId", CommentsController.getCommentById);
router.delete("/:commentId", CommentsController.deleteComment);

export default router;
