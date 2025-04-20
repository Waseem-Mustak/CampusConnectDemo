import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.route.js'; 
import userRoutes from './routes/user.route.js'; 
import postRoutes from './routes/post.route.js';
import notificationRoutes from "./routes/notification.route.js";
import connectionRoutes from "./routes/connection.route.js";


import { connectDB } from './lib/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//     res.send('Hello, World! Server is working.');
// });
// app.use(express.json()); // Middleware to parse JSON bodies 
// app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
})); // Middleware to enable CORS
app.use(express.json({ limit: "5mb" })); // parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
}); 
