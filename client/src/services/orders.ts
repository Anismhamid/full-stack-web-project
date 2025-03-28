import axios from "axios";
import {Order} from "../interfaces/Order";

const api = `${import.meta.env.VITE_API_URL}/orders`;

export const getUserOrders = async () => {
	try {
		const orders = await axios.get(api, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return orders.data;
	} catch (error) {
		console.log(error);
	}
};

export const postOrder = async (order: Order[]) => {
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
