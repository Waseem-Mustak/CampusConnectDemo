import express from "express";
import { protectRoutes } from "../middleware/auth.middleware.js";
import {
	acceptConnectionRequest,
	getConnectionRequests,
	getConnectionStatus,
	getUserConnections,
	rejectConnectionRequest,
	removeConnection,
	sendConnectionRequest,
} from "../controllers/connection.controller.js";

const router = express.Router();

router.post("/request/:userId", protectRoutes, sendConnectionRequest);
router.put("/accept/:requestId", protectRoutes, acceptConnectionRequest);
router.put("/reject/:requestId", protectRoutes, rejectConnectionRequest);
// Get all connection requests for the current user
router.get("/requests", protectRoutes, getConnectionRequests);
// Get all connections for a user
router.get("/", protectRoutes, getUserConnections);
router.delete("/:userId", protectRoutes, removeConnection);
router.get("/status/:userId", protectRoutes, getConnectionStatus);

export default router;