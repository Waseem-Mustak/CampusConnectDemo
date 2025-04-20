import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.PROD 
		? "/api/v1"  // In production, use relative path since frontend and backend are served from same domain
		: "http://localhost:5000/api/v1",
	withCredentials: true,
});
