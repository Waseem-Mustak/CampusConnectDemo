import express from 'express';
import { protectRoutes } from '../middleware/auth.middleware.js';
import { getUserSuggestions ,updateProfile,getPublicProfile} from '../controllers/user.controller.js';

const router = express.Router();


router.get("/suggestions", protectRoutes, getUserSuggestions);
router.get("/:username", protectRoutes, getPublicProfile);
router.put("/profile", protectRoutes, updateProfile);

export default router;