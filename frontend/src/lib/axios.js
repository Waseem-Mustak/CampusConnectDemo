import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.PROD 
		? "https://campusconnectdemo.onrender.com/api/v1"
		: "http://localhost:5000/api/v1",
	withCredentials: true,
});
