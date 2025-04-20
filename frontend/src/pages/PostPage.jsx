import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";
import { Loader } from "lucide-react";

const PostPage = () => {
	const { postId } = useParams();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: post, isLoading, error } = useQuery({
		queryKey: ["post", postId],
		queryFn: async () => {
			const response = await axiosInstance.get(`/posts/${postId}`);
			return response.data;
		},
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[60vh]">
				<Loader className="animate-spin" size={32} />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-[60vh]">
				<p className="text-red-500">Error loading post: {error.message}</p>
			</div>
		);
	}

	if (!post) {
		return (
			<div className="flex justify-center items-center min-h-[60vh]">
				<p className="text-gray-500">Post not found</p>
			</div>
		);
	}

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>

			<div className='col-span-1 lg:col-span-3'>
				<Post post={post} />
			</div>
		</div>
	);
};

export default PostPage;
