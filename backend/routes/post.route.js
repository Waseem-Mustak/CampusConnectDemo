import express from "express";
import { protectRoutes } from "../middleware/auth.middleware.js";
import {
	createPost,
	getFeedPosts,
	deletePost,
	getPostById,
	createComment,
	likePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", protectRoutes, getFeedPosts);
router.post("/create", protectRoutes, createPost);
router.delete("/delete/:id", protectRoutes, deletePost);
router.get("/:id", protectRoutes, getPostById);
router.post("/:id/comment", protectRoutes, createComment);
router.post("/:id/like", protectRoutes, likePost);

export default router;