import {FunctionComponent, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Cart as CartType} from "../interfaces/Cart";
import {getCartItems} from "../services/cart";
import useToken from "../hooks/useToken";
import {path} from "../routes/routes";
import {postOrder} from "../services/orders"; // Ensure postOrder is imported
import {useFormik} from "formik";
import * as yup from "yup";
import {showError, showInfo} from "../atoms/Toast";
import Loader from "../atoms/loader/Loader";
import {Order} from "../interfaces/Order";
import Checkbox from "@mui/material/Checkbox";

interface CheckoutProps {}

const Checkout: FunctionComponent<CheckoutProps> = () => {
	const {decodedToken} = useToken();
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState<CartType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const formik = useFormik({
		initialValues: {
			payment: false,
			cashOnDelivery: false,
			selfCollection: false,
			delivery: false,
			sale: false,
			discount: 0,
			totalAmount: 0,
		},
		validationSchema: yup.object({
			payment: yup.boolean().required(),
			cashOnDelivery: yup.boolean().required(),
			selfCollection: yup.boolean().required(),
			delivery: yup.boolean().required(),
			sale: yup.boolean().required(),
			discount: yup.number(),
			totalAmount: yup.number().required(),
		}),
		onSubmit: async (value) => {
			try {
				await handleCheckout(value);
				showInfo("ממתין לאישור");
			} catch (error) {
				console.log(error);
			}
		},
	});

	// Fetch the cart items when the component mounts
	useEffect(() => {
		if (decodedToken) {
			getCartItems()
				.then((items) => {
					setCartItems(items);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [decodedToken]);

	// Calculate total amount of the cart
	const totalAmount = cartItems.reduce((total, item) => {
		return (
			total +
			item.products.reduce(
				(productTotal, product) => productTotal + product.product_price,
				0,
			)
		);
	}, 0);

	const deliveryFee = 25;

	const discountedAmount = totalAmount - (totalAmount * formik.values.discount) / 100;

	const finalAmount = formik.values.delivery
		? discountedAmount + deliveryFee
		: discountedAmount;

	const handleCheckout = async (value: {
		payment: boolean;
		cashOnDelivery: boolean;
		selfCollection: boolean;
		delivery: boolean;
		sale: boolean;
		discount: number;
	}) => {
		const itemsToOrder = cartItems.flatMap((item) =>
			item.products.map((product) => ({
				product_name: product.product_name,
				product_image: product.product_image,
				product_price: product.product_price,
				quantity: product.quantity,
				sale: value.sale,
				discount: value.discount,
			})),
		);

		const newOrder = {
			userId: decodedToken._id,
			products: [...itemsToOrder],
			payment: value.payment,
			cashOnDelivery: value.cashOnDelivery,
			selfCollection: value.selfCollection,
			delivery: value.delivery,
			deliveryFee: value.delivery ? deliveryFee : 0,
			totalAmount: finalAmount,
		};
		try {
			setLoading(true);
			await postOrder(newOrder as Order);
			navigate(path.MyOrders);
			setLoading(false);
		} catch (error) {
			showError("שגיאה בביצוע ההזמנה");
		}
	};

	if (loading) return <Loader />;

	return (
		<main className='login min-vh-100 '>
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

				{/* Payment Methods Selection */}
				<form onSubmit={formik.handleSubmit} className='mt-5 text-light'>
					<h4>בחר שיטת תשלום</h4>
					<div className='mt-3'>
						{/* Credit Card */}
						<div className='form-check mb-2'>
							<Checkbox
								className='form-check-input text-light'
								id='creditCard'
								name='payment'
								checked={formik.values.payment ? true : false}
								value={formik.values.payment ? "true" : "false"}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								disabled={formik.values.cashOnDelivery}
							/>
							<label className='form-check-label' htmlFor='creditCard'>
								כרטיס אשראי
							</label>
						</div>

						{/* Cash on Delivery */}
						<div className='form-check'>
							<Checkbox
								id='cashOnDelivery'
								name='cashOnDelivery'
								checked={formik.values.cashOnDelivery ? true : false}
								value={formik.values.cashOnDelivery ? "true" : "false"}
								className='form-check-input text-light'
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								disabled={formik.values.payment}
							/>
							<label className='form-check-label' htmlFor='cashOnDelivery'>
								מזומן
							</label>
						</div>
					</div>

					{/* Collection Methods Selection */}
					<div className='mt-5'>
						<h4>בחר שיטת איסוף</h4>
						<div>
							{/* SelfCollection */}
							<div className='form-check'>
								<Checkbox
									className='form-check-input text-light'
									id='selfCollection'
									name='selfCollection'
									checked={formik.values.selfCollection ? true : false}
									value={
										formik.values.selfCollection ? "true" : "false"
									}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									disabled={formik.values.delivery}
								/>
								<label
									className='form-check-label'
									htmlFor='selfCollection'
								>
									איסוף עצמי
								</label>
							</div>

							{/* Delivery */}

							<div className='form-check'>
								<Checkbox
									className='form-check-input text-light '
									id='delivery'
									name='delivery'
									checked={formik.values.delivery}
									value={formik.values.delivery ? "true" : "false"}
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									disabled={formik.values.selfCollection}
								/>
								<label className='form-check-label' htmlFor='delivery'>
									משלוח
									<span className='text-danger fw-bold ms-2'>
										+ {deliveryFee}
									</span>
								</label>
							</div>
						</div>
					</div>
					<hr />
					<div className='form-floating'>
						<strong className='me-2'>סך הכל:</strong>
						<input
							type='text'
							name='totalAmount'
							value={finalAmount.toLocaleString("he-IL", {
								style: "currency",
								currency: "ILS",
							})}
							className='form-control bg-black text-light border-0 fs-4 text-center w-50 m-auto'
							id='totalAmount'
							disabled
						/>
					</div>
					{/* Checkout Button */}
					<div className='d-flex justify-content-center mt-4'>
						<button
							type='submit'
							disabled={
								(!formik.values.payment &&
									!formik.values.cashOnDelivery) ||
								(!formik.values.selfCollection && !formik.values.delivery)
							}
							className='btn btn-primary'
						>
							אישור
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Checkout;
