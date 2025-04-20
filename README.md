# CampusConnect

A social networking platform designed for campus communities, built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🌐 Live Demo

Visit the live application: [CampusConnect Demo](https://campusconnectdemo-sb51.onrender.com)

## 🌟 Features

- **Authentication**
  - JWT-based secure authentication
  - Protected routes and middleware
  - User registration and login

- **Posts**
  - Create, read, delete posts
  - Image upload support via Cloudinary
  - Like and comment functionality
  - Real-time post updates

- **User Profiles**
  - Customizable user profiles
  - Profile picture upload
  - User connections (similar to LinkedIn)
  - View other users' profiles and posts

- **Notifications**
  - Real-time notifications for:
    - Post likes
    - Comments
    - Connection requests
    - Connection acceptances

## 🛠️ Tech Stack

- **Frontend**
  - React
  - TailwindCSS + DaisyUI
  - React Query
  - Axios
  - React Router

- **Backend**
  - Node.js
  - Express.js
  - MongoDB
  - JWT Authentication
  - Cloudinary

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/Waseem-Mustak/CampusConnectDemo.git
cd CampusConnectDemo
```

2. Install dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

3. Set up environment variables:

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key

# Frontend URL
CLIENT_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Start the development servers
```bash
# Start backend (from root directory)
npm run dev

# Start frontend (from frontend directory)
cd frontend
npm run dev
```

## 📱 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user

### Posts
- `GET /api/v1/posts` - Get feed posts
- `POST /api/v1/posts/create` - Create a post
- `DELETE /api/v1/posts/delete/:id` - Delete a post
- `GET /api/v1/posts/:id` - Get post by ID
- `POST /api/v1/posts/:id/comment` - Add a comment
- `POST /api/v1/posts/:id/like` - Like/unlike a post

### Users
- `GET /api/v1/users/suggestions` - Get user suggestions
- `GET /api/v1/users/:username` - Get user profile
- `PUT /api/v1/users/update` - Update user profile

### Connections
- `GET /api/v1/connections/requests` - Get connection requests
- `POST /api/v1/connections/request/:userId` - Send connection request
- `POST /api/v1/connections/accept/:userId` - Accept connection request
- `POST /api/v1/connections/reject/:userId` - Reject connection request
- `DELETE /api/v1/connections/:userId` - Remove connection

### Notifications
- `GET /api/v1/notifications` - Get user notifications
- `PUT /api/v1/notifications/:id/read` - Mark notification as read
- `DELETE /api/v1/notifications/:id` - Delete notification


## 📝 License

This project is licensed under the MIT License.