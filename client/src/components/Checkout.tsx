import {FunctionComponent, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Cart as CartType} from "../interfaces/Cart";
import {getCartItems} from "../services/cart";
import useToken from "../hooks/useToken";
import {path} from "../routes/routes";
import {postOrder} from "../services/orders"; // Ensure postOrder is imported

interface CheckoutProps {}

const Checkout: FunctionComponent<CheckoutProps> = () => {
	const {decodedToken} = useToken();
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState<CartType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	// Fetch the cart items when the component mounts
	useEffect(() => {
		if (decodedToken._id) {
			getCartItems(decodedToken._id as string)
				.then((items) => {
					setCartItems(items);
					setLoading(false);
				})
				.catch((err) => {
					console.error("Error fetching cart items:", err);
					setLoading(false);
				});
		}
	}, [decodedToken]);

	// Calculate total amount of the cart
	const totalAmount = cartItems.reduce((total, item) => {
		return (
			total +
			item.products.reduce(
				(productTotal, product) =>
					productTotal + product.product_price * product.quantity,
				0,
			)
		);
	}, 0);

	if (loading) {
		return (
			<main className='min-vh-100'>
				<div className='loader'></div>
			</main>
		);
	}

	const handleCheckout = async () => {
		// Format cart items into the order structure
		const itemsToOrder = cartItems.flatMap((item) =>
			item.products.map((product) => ({
				product_name: product.product_name,
				product_image: product.product_image,
				product_price: product.product_price,
				quantity: product.quantity,
			})),
		);

		// Call the function to submit the order (postOrder)
		try {
			await postOrder(itemsToOrder as any); // Submitting the order
			navigate(path.Order); // Navigate to the order page
		} catch (error) {
			console.error("Error placing order:", error);
			// Handle error if needed
		}
	};

	return (
		<main className='min-vh-100'>
			<div className='container py-5'>
				<h1 className='text-center'>בחר שיטת תשלום</h1>

				{/* Cart Summary */}
				<div className='mt-4'>
					<h4>סיכום הסל</h4>
					<ul className='list-group'>
						{cartItems.length ? (
							cartItems.map((item, index) => (
								<div key={index}>
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
												<strong>{product.product_name}</strong> -{" "}
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
										</li>
									))}
								</div>
							))
						) : (
							<h5 className='text-danger'>אין מוצרים בסל</h5>
						)}
					</ul>
					<hr />
				</div>

				{/* Payment Method Selection */}
				<div className='mt-5'>
					<h4>בחר שיטת תשלום</h4>
					<div>
						{/* Credit Card */}
						<div className='form-check'>
							<input
								type='radio'
								className='form-check-input'
								id='creditCard'
								name='paymentMethod'
								value='creditCard'
							/>
							<label className='form-check-label' htmlFor='creditCard'>
								כרטיס אשראי
							</label>
						</div>

						{/* Cash on Delivery */}
						<div className='form-check'>
							<input
								type='radio'
								className='form-check-input'
								id='cashOnDelivery'
								name='cashOnDelivery'
								value='cashOnDelivery'
							/>
							<label className='form-check-label' htmlFor='cashOnDelivery'>
								מזומן
							</label>
						</div>
					</div>
				</div>

				{/* Collection Method */}
				<div className='mt-5'>
					<h4>בחר שיטת איסוף</h4>
					<div>
						{/* Self Collect */}
						<div className='form-check'>
							<input
								type='radio'
								className='form-check-input'
								id='selfCollect'
								name='selfCollect'
								value='selfCollect'
							/>
							<label className='form-check-label' htmlFor='selfCollect'>
								איסוף עצמי
							</label>
						</div>

						{/* Delivery */}
						<div className='form-check'>
							<input
								type='radio'
								className='form-check-input'
								id='delivery'
								name='delivery'
								value='delivery'
							/>
							<label className='form-check-label' htmlFor='delivery'>
								משלוח{" "}
								<span className='text-danger fw-bold ms-2'>+ 20 שח</span>
							</label>
						</div>
					</div>
				</div>

				<hr />
				<h4 className='text-right'>
					<strong className='me-2'>סך הכל:</strong>
					{totalAmount.toLocaleString("he-IL", {
						style: "currency",
						currency: "ILS",
					})}
				</h4>

				{/* Checkout Button */}
				<div className='d-flex justify-content-center mt-4'>
					<button onClick={handleCheckout} className='btn btn-primary'>
						אישור
					</button>
				</div>
			</div>
		</main>
	);
};

export default Checkout;
