import axios from "axios";
import {Order} from "../interfaces/Order";

const api = `${import.meta.env.VITE_API_URL}/orders`;

// Get user order
export const getUserOrders = async (userId: string) => {
	try {
		const orders = await axios.get(`${api}/${userId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return orders.data;
	} catch (error) {
		console.log(error);
	}
};

// get order Details
export const getOrderByOrderNumber = async (orderNumber: string) => {
	try {
		const response = await axios.get(`${api}/details/${orderNumber}`, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		});
		return response.data;
	} catch (error) {
		console.log("Error fetching cart items:", error);
	}
};

// get all orders for admins users
export const getAllOrders = async () => {
	try {
		const response = await axios.get(api, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

// post product from checkout
export const postOrder = async (order: Order) => {
	try {
		const orders = await axios.post(
			api,
			{
				products: order,
			},
			{
				headers: {Authorization: localStorage.getItem("token")},
			},
		);
		return orders.data;
	} catch (error) {
		console.log(error);
	}
};

// Patch order status
export const patchStatus = async (status: string, orderNumber: string) => {
	try {
		const patchStatus = await axios.patch(
			`${api}/${orderNumber}`,
			{status},
			{headers: {Authorization: localStorage.getItem("token")}},
		);
		return patchStatus.data;
	} catch (error) {
		console.log(error);
	}
};
