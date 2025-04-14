import axios from "axios";
import {UserLogin, UserRegister} from "../interfaces/User";
import {showError, showSuccess} from "../atoms/Toast";
import {jwtDecode} from "jwt-decode";

const api = `${import.meta.env.VITE_API_URL}/users`;

interface GoogleJwtPayload {
	email: string;
	email_verified: string;
	exp: string;
	family_name: string;
	given_name: string;
	iat: string;
	iss: string;
	name: string;
	picture: string; // הוספת picture
	sub: string;
	typ: string;
	aud: string;
	azp: string;
	jti: string;
	kid: string;
	nbf: string;
}

/**
 * Register a new user
 * @param newUserData - New user registration data
 * @returns Token string if registration is successful, or null if there's an error
 */
export const registerNewUser = async (newUserData: UserRegister) => {
	try {
		const response = await axios.post(api, newUserData);
		showSuccess("נחמד, נרשמת בהצלחה!. עכשיו אתה יכול להתחבר");
		return response.data;
	} catch (error) {
		console.log(error);
		showError("Invalid Data try again.");
		return null;
	}
};

export const handleGoogleLogin = async (response: any) => {
	try {
		const decoded = jwtDecode<GoogleJwtPayload>(response.credential);
		const {email, given_name, family_name, picture, sub} = decoded;

		if (!email || !sub) {
			throw new Error("Missing required Google user info");
		}

		const userData = {
			googleId: sub,
			email,
			name: {
				first: given_name,
				last: family_name,
			},
			image: {
				url: picture,
				alt: given_name,
			},
		};

		const res = await axios.post(
			`${import.meta.env.VITE_API_URL}/google-login`,
			userData,
		);
		console.log("User logged in:", res.data);
		return res.data;
	} catch (error) {
		console.error("Error during Google login:", error);
	}
};


export	const verifyGoogleToken = async (token: string) => {
		const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;
		try {
			const response = await axios.get(url);
			return response.data;
		} catch (error) {
			throw new Error("Failed to verify Google token");
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
	} catch (error: any) {
		if (error.request.response === "Too Many Requests") {
			showError(error.request.response);
		} else {
			// showError("Invalid email or password");
			showError(error.response.statusText);
		}
		console.log();
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
