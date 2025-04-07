import axios from "axios";
import {UserLogin, UserRegister} from "../interfaces/User";
import {showError, showSuccess} from "../atoms/Toast";

const api = `${import.meta.env.VITE_API_URL}/users`;

/**
 * Register a new user
 * @param newUserData - New user registration data
 * @returns Token string if registration is successful, or null if there's an error
 */
export const registerNewUser = async (newUserData: UserRegister) => {
	try {
		const response = await axios.post(api, newUserData);
		showSuccess("נחמד, נרשמת בהצלחה!. עכשיו אתה יכול להתחבר");
		console.log(response.data);

		return response.data;
	} catch (error) {
		console.log(error);
		showError("Invalid Data try again.");
		return null;
	}
};

/**
 * Login user and get a token
 * @param userData - User credentials (Email and Password)
 * @returns Token string if login is successful, or null if there's an error
 */
export const loginUser = async (userData: UserLogin) => {
	try {
		const response = await axios.post(`${api}/login`, userData);
		return response.data;
	} catch (error) {
		showError("Invalid email or password");
		return null;
	}
};

/**
 * Get all users for admins
 * @returns Array of users if successful, or null if there's an error or no token
 */
export const getAllUsers = async () => {
	try {
		const response = await axios.get(api, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

/**
 * Get user by ID for admins or moderators
 * @param userId - The user ID to retrieve
 * @returns The user object if successful, or null if there's an error or no token
 */
export const getUserById = async (userId: string) => {
	try {
		const response = await axios.get(`${api}/${userId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};

/**
 * Patch user role by userId
 * @param userId - User ID to update
 * @param newRole - New role to assign to the user
 * @returns A user object with the updated role, or null in case of an error
 */
export const patchUserRole = async (userId: string, newRole: string) => {
	try {
		const response = await axios.patch(
			`${api}/role/${userId}`,
			{role: newRole},
			{
				headers: {Authorization: localStorage.getItem("token")},
			},
		);
		return response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
};
