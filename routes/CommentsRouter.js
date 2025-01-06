import express from "express";
import * as CommentsController from "../controllers/CommentsController.js";
const router = express.Router();

router.post("/:postId", CommentsController.addComment);
router.put("/:commentId", CommentsController.updateComment);
router.get("/:postId", CommentsController.getPostComments);
router.get("/single/:commentId", CommentsController.getCommentById);
router.delete("/:commentId", CommentsController.deleteComment);

export default router;
