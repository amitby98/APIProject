import express from "express";
import * as PostController from "../controllers/PostController";
import authMiddleware from "../auth.middleware";
const router = express.Router();

router.post("/", authMiddleware, PostController.addPost);
router.put("/:postId", authMiddleware, PostController.updatePost);
router.get("/all", PostController.getAllPosts);
router.get("/:postId", PostController.getPostById);
router.get("/", PostController.getPostsBySender);
export default router;
