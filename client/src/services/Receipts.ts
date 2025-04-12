import axios from "axios";

const api = import.meta.env.VITE_API_URL;

export const getUserReceiptsById = async (userId: string) => {
	try {
		const response = await axios.get(`${api}/receipt/${userId}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getUsersReceipts = async () => {
	try {
		const response = await axios.get(`${api}/receipt`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
