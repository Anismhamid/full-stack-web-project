import axios from "axios";
import {Fruit} from "../interfaces/Fruit";

const api = `${import.meta.env.VITE_API_URL}/products`;

/**
 * Gets fruits
 * @returns fruits
 */
export async function getFruits() {
	try {
		const response = await axios.get(`${api}/fruits`);

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Gets vegentable
 * @returns vegentable
 */
export async function getVegentable() {
	try {
		const response = await axios.get(`${api}/vegetable`);

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 *
 * Adds new fruit
 * @param fruit
 * @returns fruit
 */
export async function addNewFruit(fruit: Fruit) {
	try {
		const response = await axios.post(`${api}/fruits`, fruit, {
			headers: {Authorization: localStorage.getItem("token")},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

