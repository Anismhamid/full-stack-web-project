import {FunctionComponent, useEffect, useState} from "react";
import {getCartItems} from "../services/cart";
import {Cart as CartType} from "../interfaces/Cart";
import useToken from "../hooks/useToken";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
	const [items, setItems] = useState<CartType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const {decodedToken} = useToken();

	// Fetch cart items when the component mounts
	useEffect(() => {
		if (decodedToken._id) {
			setLoading(true);
			getCartItems(decodedToken._id as string)
				.then((cartItems) => {
					setItems(cartItems);
					setLoading(false);
				})
				.catch((err) => {
					console.error("Failed to load cart items:", err);
					setLoading(false);
				});
		}
	}, [decodedToken,loading]);

	// Calculate total amount of the cart, only considering items that have valid products
	const totalAmount = items.reduce(
		(total, item) =>
			total +
			(item.products?.[0]?.product_price ?? 0) *
				(item.products?.[0]?.quantity ?? 0),
		0,
	);

	if (loading) {
		return (
			<main className='min-vh-100'>
				<div className='loader'></div>
			</main>
		);
	}

	return (
		<main className='min-vh-100'>
			<div className='container py-5'>
				<h1 className='text-center'>סל קניות</h1>
				<div className='mt-4'>
					<ul className='list-group'>
						{items.length ? (
							items.map((item) => (
								<div>
									{item.products.map((product) => (
										<li
											key={product.product_name}
											className='list-group-item d-flex justify-content-between align-items-center'
										>
											<div>
												<img
													style={{width: "100px"}}
													className='img-fluid me-5 rounded'
													src={product.product_image}
													alt={product.product_name}
												/>
												<strong className="me-1 text-danger">{product.sale?"במבצע":""}|</strong>
												<strong>{product.product_name}</strong> -
												{product.quantity} ק"ג
												<div className='text-muted'>
													{product.product_price.toLocaleString(
														"he-IL",
														{
															style: "currency",
															currency: "ILS",
														},
													)}
												</div>
											</div>
											<button
												// onClick={() => removeFromCart(item.product_name)}
												className='btn btn-danger btn-sm'
											>
												מחיקה
											</button>
										</li>
									))}
								</div>
							))
						) : (
							<h5 className="text-danger">אין מוצרים בסל</h5>
						)}
					</ul>
					<hr />
					<h4 className='text-right'>
						<strong>סך הכל:</strong>{" "}
						{totalAmount.toLocaleString("he-IL", {
							style: "currency",
							currency: "ILS",
						})}
					</h4>
					<div className='d-flex justify-content-center mt-3'>
						<button className='btn btn-primary'>המשך לקופה</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Cart;
