import {useEffect, useState} from "react";
import {Cart} from "../interfaces/Cart";
import {getOrderByOrderNumber} from "../services/orders";

// Custom Hook to Fetch Order Details
const useOrderDetails = (orderNumber: string) => {
	const [cartItems, setCartItems] = useState<Cart | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				const data = await getOrderByOrderNumber(orderNumber);
				setCartItems(data);
			} catch (err) {
				setError("Failed to load order details. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchOrder();
		window.scroll(0, 0);
	}, [orderNumber]);

	return {cartItems, loading, error};
};

export default useOrderDetails;