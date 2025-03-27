import axios from "axios";
import {UserLogin, UserRegister} from "../interfaces/User";

const api = `${import.meta.env.VITE_API_URL}/users`;

// Reagister a new user
export const registerNewUser = async (newUserData: UserRegister) => {
	try {
		const response = await axios.post(api, newUserData);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// Login user
export const loginUser = async (userData: UserLogin) => {
	try {
		const response = await axios.post(`${api}/login`, userData);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// get all users for admins
export const getAllUsers = async () => {
	try {
		const response = await axios.get(api, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
