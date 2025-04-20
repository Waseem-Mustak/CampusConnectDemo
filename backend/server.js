import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/auth.route.js'; 
import userRoutes from './routes/user.route.js'; 
import postRoutes from './routes/post.route.js';
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";

import { connectDB } from './lib/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Configure CORS for both development and production
app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? "https://campusconnectdemo-sb51.onrender.com"
        : process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

// Serve static files in production
if(process.env.NODE_ENV === "production") {
    // Serve frontend static files
    app.use(express.static(path.join(__dirname, "frontend", "dist")));

    // Handle all other routes by serving the index.html
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
}); 
