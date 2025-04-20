// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
// import { Link, useParams } from "react-router-dom";
// import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2 } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";

// import PostAction from "./PostAction";

// const Post = ({ post }) => {
// 	const { postId } = useParams();

// 	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
// 	const [showComments, setShowComments] = useState(false);
// 	const [newComment, setNewComment] = useState("");
// 	const [comments, setComments] = useState(post.comments || []);
// 	const isOwner = authUser._id === post.author._id;
// 	const isLiked = post.likes.includes(authUser._id);

// 	const queryClient = useQueryClient();

// 	const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
// 		mutationFn: async () => {
// 			await axiosInstance.delete(`/posts/delete/${post._id}`);
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 			toast.success("Post deleted successfully");
// 		},
// 		onError: (error) => {
// 			toast.error(error.message);
// 		},
// 	});

// 	const { mutate: createComment, isPending: isAddingComment } = useMutation({
// 		mutationFn: async (newComment) => {
// 			await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 			queryClient.invalidateQueries({ queryKey: ["post", postId] });
// 			toast.success("Comment added successfully");
// 		},
// 		onError: (err) => {
// 			toast.error(err.response.data.message || "Failed to add comment");
// 		},
// 	});

// 	const { mutate: likePost, isPending: isLikingPost } = useMutation({
// 		mutationFn: async () => {
// 			await axiosInstance.post(`/posts/${post._id}/like`);
// 		},
// 		onSuccess: () => {
// 			queryClient.invalidateQueries({ queryKey: ["posts"] });
// 			queryClient.invalidateQueries({ queryKey: ["post", postId] });
// 		},
// 	});

// 	const handleDeletePost = () => {
// 		if (!window.confirm("Are you sure you want to delete this post?")) return;
// 		deletePost();
// 	};

// 	const handleLikePost = async () => {
// 		if (isLikingPost) return;
// 		likePost();
// 	};

// 	const handleAddComment = async (e) => {
// 		e.preventDefault();
// 		if (newComment.trim()) {
// 			createComment(newComment);
// 			setNewComment("");
// 			setComments([
// 				...comments,
// 				{
// 					content: newComment,
// 					user: {
// 						_id: authUser._id,
// 						name: authUser.name,
// 						profilePicture: authUser.profilePicture,
// 					},
// 					createdAt: new Date(),
// 				},
// 			]);
// 		}
// 	};

// 	return (
// 		<div className='bg-secondary rounded-lg shadow mb-4'>
// 			<div className='p-4'>
// 				<div className='flex items-center justify-between mb-4'>
// 					<div className='flex items-center'>
// 						<Link to={`/profile/${post?.author?.username}`}>
// 							<img
// 								src={post.author.profilePicture || "/avatar.png"}
// 								alt={post.author.name}
// 								className='size-10 rounded-full mr-3'
// 							/>
// 						</Link>

// 						<div>
// 							<Link to={`/profile/${post?.author?.username}`}>
// 								<h3 className='font-semibold'>{post.author.name}</h3>
// 							</Link>
// 							<p className='text-xs text-info'>{post.author.headline}</p>
// 							<p className='text-xs text-info'>
// 								{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
// 							</p>
// 						</div>
// 					</div>
// 					{isOwner && (
// 						<button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>
// 							{isDeletingPost ? <Loader size={18} className='animate-spin' /> : <Trash2 size={18} />}
// 						</button>
// 					)}
// 				</div>
// 				<p className='mb-4'>{post.content}</p>
// 				{post.image && <img src={post.image} alt='Post content' className='rounded-lg w-full mb-4' />}

// 				<div className='flex justify-between text-info'>
// 					<PostAction
// 						icon={<ThumbsUp size={18} className={isLiked ? "text-blue-500  fill-blue-300" : ""} />}
// 						text={`Like (${post.likes.length})`}
// 						onClick={handleLikePost}
// 					/>

// 					<PostAction
// 						icon={<MessageCircle size={18} />}
// 						text={`Comment (${comments.length})`}
// 						onClick={() => setShowComments(!showComments)}
// 					/>
// 					<PostAction icon={<Share2 size={18} />} text='Share' />
// 				</div>
// 			</div>

// 			{showComments && (
// 				<div className='px-4 pb-4'>
// 					<div className='mb-4 max-h-60 overflow-y-auto'>
// 						{comments.map((comment) => (
// 							<div key={comment._id} className='mb-2 bg-base-100 p-2 rounded flex items-start'>
// 								<img
// 									src={comment.user.profilePicture || "/avatar.png"}
// 									alt={comment.user.name}
// 									className='w-8 h-8 rounded-full mr-2 flex-shrink-0'
// 								/>
// 								<div className='flex-grow'>
// 									<div className='flex items-center mb-1'>
// 										<span className='font-semibold mr-2'>{comment.user.name}</span>
// 										<span className='text-xs text-info'>
// 											{formatDistanceToNow(new Date(comment.createdAt))}
// 										</span>
// 									</div>
// 									<p>{comment.content}</p>
// 								</div>
// 							</div>
// 						))}
// 					</div>

// 					<form onSubmit={handleAddComment} className='flex items-center'>
// 						<input
// 							type='text'
// 							value={newComment}
// 							onChange={(e) => setNewComment(e.target.value)}
// 							placeholder='Add a comment...'
// 							className='flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary'
// 						/>

// 						<button
// 							type='submit'
// 							className='bg-primary text-white p-2 rounded-r-full hover:bg-primary-dark transition duration-300'
// 							disabled={isAddingComment}
// 						>
// 							{isAddingComment ? <Loader size={18} className='animate-spin' /> : <Send size={18} />}
// 						</button>
// 					</form>
// 				</div>
// 			)}
// 		</div>
// 	);
// };
// export default Post;


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import PostAction from "./PostAction";

const Post = ({ post }) => {
	const { postId } = useParams();

	const { data: authUser } = useQuery({ queryKey: ["authUser"] });
	const [showComments, setShowComments] = useState(false);
	const [newComment, setNewComment] = useState("");
	// Remove the local comments state and use post.comments directly
	const isOwner = authUser._id === post.author._id;
	const isLiked = post.likes.includes(authUser._id);

	const queryClient = useQueryClient();

	// Add a query for the current post to get real-time updates
	const { data: currentPost } = useQuery({
		queryKey: ["post", post._id],
		queryFn: async () => {
			if (showComments) {
				const response = await axiosInstance.get(`/posts/${post._id}`);
				return response.data;
			}
			return post;
		},
		enabled: showComments, // Only fetch when comments are shown
		refetchInterval: showComments ? 3000 : false, // Poll every 3 seconds when comments are visible
	});

	// Use the most up-to-date post data
	const displayPost = currentPost || post;
	const comments = displayPost.comments || [];

	const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.delete(`/posts/delete/${post._id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			toast.success("Post deleted successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const { mutate: createComment, isPending: isAddingComment } = useMutation({
		mutationFn: async (newComment) => {
			await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
		},
		onSuccess: () => {
			// Invalidate both the posts list and the specific post
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post", post._id] });
			toast.success("Comment added successfully");
		},
		onError: (err) => {
			toast.error(err.response?.data?.message || "Failed to add comment");
		},
	});

	const { mutate: likePost, isPending: isLikingPost } = useMutation({
		mutationFn: async () => {
			await axiosInstance.post(`/posts/${post._id}/like`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["post", post._id] });
		},
	});

	const handleDeletePost = () => {
		if (!window.confirm("Are you sure you want to delete this post?")) return;
		deletePost();
	};

	const handleLikePost = async () => {
		if (isLikingPost) return;
		likePost();
	};

	const handleAddComment = (e) => {
		e.preventDefault();
		if (newComment.trim()) {
			createComment(newComment);
			setNewComment("");
			// Remove the manual state update - let React Query handle it
		}
	};

	// When comments visibility changes, make sure we have the latest data
	useEffect(() => {
		if (showComments) {
			queryClient.invalidateQueries({ queryKey: ["post", post._id] });
		}
	}, [showComments, post._id, queryClient]);

	return (
		<div className='bg-secondary rounded-lg shadow mb-4'>
			<div className='p-4'>
				<div className='flex items-center justify-between mb-4'>
					<div className='flex items-center'>
						<Link to={`/profile/${displayPost?.author?.username}`}>
							<img
								src={displayPost.author.profilePicture || "/avatar.png"}
								alt={displayPost.author.name}
								className='size-10 rounded-full mr-3'
							/>
						</Link>

						<div>
							<Link to={`/profile/${displayPost?.author?.username}`}>
								<h3 className='font-semibold'>{displayPost.author.name}</h3>
							</Link>
							<p className='text-xs text-info'>{displayPost.author.headline}</p>
							<p className='text-xs text-info'>
								{formatDistanceToNow(new Date(displayPost.createdAt), { addSuffix: true })}
							</p>
						</div>
					</div>
					{isOwner && (
						<button onClick={handleDeletePost} className='text-red-500 hover:text-red-700'>
							{isDeletingPost ? <Loader size={18} className='animate-spin' /> : <Trash2 size={18} />}
						</button>
					)}
				</div>
				<p className='mb-4 break-words whitespace-pre-wrap'>{displayPost.content}</p>

				{displayPost.image && <img src={displayPost.image} alt='Post content' className='rounded-lg w-full mb-4' />}

				<div className='flex justify-between text-info'>
					<PostAction
						icon={<ThumbsUp size={18} className={isLiked ? "text-blue-500  fill-blue-300" : ""} />}
						text={`Like (${displayPost.likes.length})`}
						onClick={handleLikePost}
					/>

					<PostAction
						icon={<MessageCircle size={18} />}
						text={`Comment (${comments.length})`}
						onClick={() => setShowComments(!showComments)}
					/>
					<PostAction
					icon={<Share2 size={18} />}
					text="Share"
					disabled={true}
					/>

				</div>
			</div>

			{showComments && (
				<div className='px-4 pb-4'>
					<div className='mb-4 max-h-60 overflow-y-auto'>
						{comments.map((comment) => (
							<div key={comment._id || `temp-${comment.createdAt}`} className='mb-2 bg-base-100 p-2 rounded flex items-start'>
								<img
									src={comment.user.profilePicture || "/avatar.png"}
									alt={comment.user.name}
									className='w-8 h-8 rounded-full mr-2 flex-shrink-0'
								/>
								<div className='flex-grow'>
									<div className='flex items-center mb-1'>
										<span className='font-semibold mr-2'>{comment.user.name}</span>
										<span className='text-xs text-info'>
											{formatDistanceToNow(new Date(comment.createdAt))}
										</span>
									</div>
									<p>{comment.content}</p>
								</div>
							</div>
						))}
					</div>

					<form onSubmit={handleAddComment} className='flex items-center'>
						<input
							type='text'
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder='Add a comment...'
							className='flex-grow p-2 rounded-l-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary'
						/>

						<button
							type='submit'
							className='bg-primary text-white p-2 rounded-r-full hover:bg-primary-dark transition duration-300'
							disabled={isAddingComment}
						>
							{isAddingComment ? <Loader size={18} className='animate-spin' /> : <Send size={18} />}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};
export default Post;