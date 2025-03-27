import {showError, showSuccess} from "../atoms/Toast";
import {addToCart} from "../services/cart";

interface Quantities {
	[product_name: string]: number;
}

/**
 * @param setQuantities quantity setter
 * @param action "+" or "-"
 * @param product_name The name of the product (e.g., "Apple")
 */

export const handleQuantity = (
	setQuantities: React.Dispatch<React.SetStateAction<Quantities>>,
	action: "-" | "+",
	product_name: string,
) => {
	setQuantities((prevQuantities: Quantities) => {
		const currentQuantity = prevQuantities[product_name] || 1;
		const newQuantity =
			action === "-" ? Math.max(1, currentQuantity - 1) : currentQuantity + 1;
		return {...prevQuantities, [product_name]: newQuantity};
	});
};

/**
 * @param product_name The name of the product (e.g., "Apple")
 * @param setQuantities quantity setter
 * @param quantity The quantity of the product to add
 * @param product_price The price of the product
 * @param product_image The price of the product
 */

export const handleAddToCart = async (
	setQuantities: React.Dispatch<React.SetStateAction<Quantities>>,
	product_name: string,
	quantity: number,
	product_price: number,
	product_image: string,
	sale:boolean
) => {
	try {
		const response = await addToCart(
			product_name,
			quantity,
			product_price,
			product_image,
			sale
		);

		if (response) {
			showSuccess(`${quantity} ק"ג ${product_name} נוסף לעגלת הקניות בהצלחה`);

			// Reset quantity for this specific product after adding it to the cart
			setQuantities((prevQuantities) => ({
				...prevQuantities,
				[product_name]: 1,
			}));
		}
	} catch (error: unknown) {
		console.error("Error adding to cart:", error);

		// Handling errors with more descriptive messages
		if (error instanceof Error) {
			showError(
				error.message || "Failed to add product to cart. Please try again later.",
			);
		} else {
			showError("An unexpected error occurred.");
		}
	}
};
