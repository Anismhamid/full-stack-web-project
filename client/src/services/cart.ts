import axios from "axios";

const api = `${import.meta.env.VITE_API_URL}`;

/**
 * Adds to cart
 * @param product_name The name of the product to add to the cart
 * @param quantity The quantity of the product
 * @param product_price The price of the product
 * @param product_image The image URL of the product
 * @param	sale product there are On sale,
 * @param discount Optional sending discount i't 0 by deafult ,
 * @returns Cart The updated cart data or an error message
 */
export const addToCart = async (
	product_name: string,
	quantity: number,
	product_price: number,
	product_image: string,
	sale: boolean,
	discount: number,
) => {
	try {
		const product = {
			product_name,
			quantity,
			product_price,
			product_image,
			sale,
			discount,
		};

		const response = await axios.post(`${api}/carts`, product, {
			headers: {Authorization: localStorage.getItem("token")},
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getCartItems = async () => {
	try {
		const response = await axios.get(`${api}/carts/my-cart`, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		});

		return response.data;
	} catch (error) {
		console.log("Error fetching cart items:", error);
	}
};

export const DeleteCartItems = async (product_name: string) => {
	try {
		const response = await axios.delete(`${api}/carts/${product_name}`, {
			headers: {
				Authorization: localStorage.getItem("token"),
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};
