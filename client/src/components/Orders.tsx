import {FunctionComponent, useState, useEffect} from "react";
import {getUserOrders, patchStatus} from "../services/orders";
import {Order} from "../interfaces/Order";
import NavigathionButtons from "../atoms/NavigathionButtons";
import Loader from "../atoms/loader/Loader";
import {fontAwesomeIcon} from "../FontAwesome/Icons";
import {useUser} from "../context/useUSer";
import {useNavigate} from "react-router-dom";

interface OrdersProps {}

const Orders: FunctionComponent<OrdersProps> = () => {
	const navigate = useNavigate();
	const {auth} = useUser();
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [orderStatuses, setOrderStatuses] = useState<{[orderNumber: string]: string}>(
		{},
	);

	useEffect(() => {
		if (auth)
			getUserOrders(auth._id)
				.then((res) => {
					setOrders(res);
					setLoading(false);

					const initialStatuses: {[orderId: string]: string} = {};
					res.forEach(
						(order: {orderNumber: string | number; status: string}) => {
							initialStatuses[order.orderNumber] = order.status;
						},
					);
					setOrderStatuses(initialStatuses);
				})

				.catch((error) => {
					console.error("Failed to fetch orders:", error);
					setLoading(false);
				});
	}, [auth]);

	const totalAmount = orders.reduce((total, item) => {
		return (
			total +
			item.products.reduce(
				(productTotal, product) => productTotal + product.product_price,
				0,
			)
		);
	}, 0);

	// Handle order status
	const handleStatus = async (status: string, orderId: string) => {
		await patchStatus(status, orderId);

		setOrderStatuses((prevStatuses) => ({
			...prevStatuses,
			[orderId]: status,
		}));
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<main className='min-vh-100 login'>
			<div className='container py-5 mt-5'>
				<h1 className='text-center bg-light rounded'>הזמנות שלי</h1>
				<div className='row'>
					{orders.length ? (
						orders.map((order) => (
							<div key={order.createdAt} className='mb-4 col-md-6'>
								<div className=' card p-4 shadow-sm'>
									<h5 className='card-title text-center bg-primary text-white p-2 rounded'>
										<strong>מ"ס הזמנה:</strong> {order.orderNumber}
									</h5>
									<div className='d-flex flex-column align-items-start mb-3'>
										<div className=' my-1'>
											<strong>ID מזמין:</strong>
											<span className='font-weight-bold ms-1'>
												{order.userId}
											</span>
										</div>
										<div>
											<strong>תאריך הזמנה:</strong>{" "}
											{new Date(order.date).toLocaleDateString(
												"he-IL",
											)}
										</div>
										<div className='mt-1'>
											<strong>סטטוס:</strong>{" "}
											<span
												className={`${
													orderStatuses[order.orderNumber] ===
													"Pending"
														? "text-danger"
														: orderStatuses[
																order.orderNumber
														  ] === "Shipped"
														? "text-success"
														: orderStatuses[
																order.orderNumber
														  ] === "Delivered"
														? "text-info"
														: orderStatuses[
																order.orderNumber
														  ] === "Preparing"
														? "text-primary"
														: orderStatuses[
																order.orderNumber
														  ] === "Cancelled"
														? "text-danger"
														: ""
												}`}
											>
												{orderStatuses[order.orderNumber] ===
												"Pending"
													? "בהמתנה"
													: orderStatuses[order.orderNumber] ===
													  "Shipped"
													? "נמסר"
													: orderStatuses[order.orderNumber] ===
													  "Delivered"
													? "נשלח"
													: orderStatuses[order.orderNumber] ===
													  "Preparing"
													? "ההזמנה שלך בהכנה"
													: orderStatuses[order.orderNumber] ===
													  "Cancelled"
													? "בוטל"
													: ""}
											</span>
										</div>
									</div>

									{((auth && auth.role === "Admin") ||
										(auth && auth?.role === "Moderator")) && (
										<div className='d-flex align-items-center justify-content-around'>
											<button
												onClick={() =>
													handleStatus(
														"Preparing",
														order.orderNumber,
													)
												}
												className='btn btn-primary'
											>
												הכנה
											</button>
											<button
												onClick={() =>
													handleStatus(
														"Delivered",
														order.orderNumber,
													)
												}
												className='btn btn-info'
											>
												נשלח
											</button>
											<button
												onClick={() =>
													handleStatus(
														"Shipped",
														order.orderNumber,
													)
												}
												className='btn btn-success'
											>
												נמסר
											</button>
											<button
												onClick={() =>
													handleStatus(
														"Cancelled",
														order.orderNumber,
													)
												}
												className='btn btn-danger'
											>
												ביטול
											</button>
										</div>
									)}

									<div className='mb-3'>
										<strong>שיטת תשלום:</strong>{" "}
										{order.products[0].payment ? (
											<span className='text-success'>
												{fontAwesomeIcon.creditCard}
												כרטיס אשראי
											</span>
										) : (
											<span className='text-warning'>
												{fontAwesomeIcon.moneyBillWave}
												מזומן
											</span>
										)}
									</div>

									<div className='mb-3'>
										<strong>שיטת איסוף:</strong>{" "}
										{order.products[0].selfCollection ? (
											<span className='text-info'>
												{fontAwesomeIcon.boxOpen}
												איסוף עצמי
											</span>
										) : order.products[0].delivery ? (
											<span className='text-primary'>
												{fontAwesomeIcon.boxOpen}
												משלוח + 20 שח
											</span>
										) : (
											<span className='text-muted'>לא נבחר</span>
										)}
									</div>

									<div>
										<h5 className='text-center text-success'>
											<strong>ס"כ מחיר הזמנה:</strong>{" "}
											{order.products
												.reduce(
													(productTotal, product) =>
														productTotal +
														product.product_price,
													0,
												)
												.toLocaleString("he-IL", {
													style: "currency",
													currency: "ILS",
												})}
										</h5>
									</div>

									<div className='d-flex justify-content-center mt-3'>
										<button
											onClick={() => {
												navigate(
													`/orderDetails/${order.orderNumber}`,
												);
											}}
											className='btn btn-info btn-sm'
										>
											פרטים נוספים
										</button>
									</div>
								</div>
							</div>
						))
					) : (
						<div className='text-center text-danger fs-4'>
							אין הזמנות עדיין
						</div>
					)}
				</div>
				<div className='my-4 text-center'>
					<h5 className='text-black'>
						<strong>ס"ה קניתה אצלנו ב:</strong>{" "}
						{totalAmount.toLocaleString("he-IL", {
							style: "currency",
							currency: "ILS",
						})}
					</h5>
				</div>

				<div className='text-center'>
					<NavigathionButtons />
				</div>
			</div>
		</main>
	);
};

export default Orders;
