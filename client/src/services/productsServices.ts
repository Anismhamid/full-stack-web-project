import axios from "axios";
import {Products} from "../interfaces/Products";

const api = `${import.meta.env.VITE_API_URL}`;

/**
 * Gets fruits
 * @returns fruits
 */
export async function getFruits() {
	try {
		const response = await axios.get(`${api}/products/fruit`);

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Gets Vegetale
 * @returns Vegetale
 */
export async function getVegetable() {
	try {
		const response = await axios.get(`${api}/products/vegetable`);

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Gets all products
 * @returns products
 */
export const getAllProducts = async () => {
	try {
		const response = await axios.get(`${api}/products`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

/**
 *
 * Create a new product
 * @param products
 * @returns products
 */
export async function createNewProduct(products: Products) {
	try {
		const response = await axios.post(`${api}/products`, products, {
			headers: {Authorization: localStorage.getItem("token")},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

/**
 * Gets products in discount
 * @returns
 */
export async function getProductsInDiscount() {
	try {
		const response = await axios.get(`${api}/discounts`);

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

// Delete product by productId
export async function deleteProduct(productId: string) {
	try {
		const response = await axios.delete(`${api}/products/${productId}`, {
			headers: {Authorization: localStorage.getItem("token")},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
}

// //===========fish============
// export async function getFishProducts() {
// 	try {
// 		const fishes = await axios.get(`${api}/products/fish`);
// 		return fishes.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// //===========Meat============
// export async function getMeatProducts() {
// 	try {
// 		const fishes = await axios.get(`${api}/products/meat`);
// 		return fishes.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// //===========Spices============
// export async function getSpicesProducts() {
// 	try {
// 		const fishes = await axios.get(`${api}/products/spices`);
// 		return fishes.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// //===========Dairy============
// export async function getDairyProducts() {
// 	try {
// 		const fishes = await axios.get(`${api}/products/dairy`);
// 		return fishes.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// //===========Bakery============
// export async function getBakeryProducts() {
// 	try {
// 		const fishes = await axios.get(`${api}/products/bakery`);
// 		return fishes.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// //===========Beverages============
// export async function getBeveragesProducts() {
// 	try {
// 		const fishes = await axios.get(`${api}/products/beverages`);
// 		return fishes.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

//===========Forzen============
// export async function getFrozenProducts() {
// 	try {
// 		const fishes = await axios.get(`${api}/products/forzen`);
// 		return fishes.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

//===========Snack============
// export async function getSnacksProducts() {
// 	try {
// 		const fishes = await axios.get(`${api}/products/snacks`);
// 		return fishes.data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

export const getProductsByCategory = async (category: string) => {
	try {
		const response = await axios(`${api}/products/${category}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching products by category:", error);
		throw error;
	}
};
