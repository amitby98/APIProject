import express from "express";
import * as UserController from "../controllers/UserController";
import authMiddleware from "../auth.middleware";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/refresh", UserController.refreshToken);
router.post("/logout", authMiddleware, UserController.logoutUser);
router.get("/me", authMiddleware, UserController.me);

export default router;
