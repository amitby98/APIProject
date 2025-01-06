import express from "express";
import * as PostController from "../controllers/PostController.js";
const router = express.Router();

router.post("/", PostController.addPost);
router.put("/:postId", PostController.updatePost);
router.get("/all", PostController.getAllPosts);
router.get("/:postId", PostController.getPostById);
router.get("/", PostController.getPostsBySender);
export default router;
