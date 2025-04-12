import {FunctionComponent, useEffect, useMemo, useState} from "react";
import {Order} from "../interfaces/Order";
import {getAllOrders, patchStatus} from "../services/orders";
import {useNavigate} from "react-router-dom";
import {useUser} from "../context/useUSer";
import Loader from "../atoms/loader/Loader";
import {fontAwesomeIcon} from "../FontAwesome/Icons";
import NavigathionButtons from "../atoms/NavigathionButtons";
import RoleType from "../interfaces/UserType";
import {io} from "socket.io-client";
import {showNewOrderToast} from "../atoms/bootStrapToast/SocketToast";
import {Form} from "react-bootstrap";

interface AllTheOrdersProps {}

const AllTheOrders: FunctionComponent<AllTheOrdersProps> = () => {
	const [orderStatuses, setOrderStatuses] = useState<{[orderNumber: string]: string}>(
		{},
	);
	const [statusLoading, setStatusLoading] = useState<{[orderNumber: string]: boolean}>(
		{},
	); // Track loading for each status update
	const [allOrders, setAllOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();
	const {auth} = useUser();

	const filteredOrders = useMemo(() => {
		return allOrders.filter((order) =>
			order.orderNumber.toUpperCase().includes(searchQuery.toLowerCase()),
		);
	}, [allOrders, searchQuery]);

	useEffect(() => {
		const socket = io(import.meta.env.VITE_API_SOCKET_URL, {
			transports: ["websocket"],
		});

		socket.on("new order", (newOrder) => {
			setAllOrders((prevOrders) => [newOrder, ...prevOrders]);
			showNewOrderToast({
				navigate,
				navigateTo: `/orderDetails/${newOrder.orderNumber}`,
				orderNum: newOrder.orderNumber,
			});
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		getAllOrders()
			.then((res) => {
				setAllOrders(res.reverse());

				const initialStatuses: {[orderId: string]: string} = {};
				res.forEach((order: {orderNumber: string | number; status: string}) => {
					initialStatuses[order.orderNumber] = order.status;
				});
				setOrderStatuses(initialStatuses);
			})
			.catch((error) => {
				console.error("Failed to fetch orders:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handleStatus = useMemo(
		() => async (status: string, orderId: string) => {
			setStatusLoading((prev) => ({...prev, [orderId]: true})); // loading state for specific order
			try {
				await patchStatus(status, orderId);
				setOrderStatuses((prevStatuses) => ({
					...prevStatuses,
					[orderId]: status,
				}));
			} catch (error) {
				console.error("Failed to update order status:", error);
			} finally {
				setTimeout(() => {
					setStatusLoading((prev) => ({...prev, [orderId]: false})); // Reset loading state
				}, 1000);
			}
		},
		[statusLoading, orderStatuses],
	);

	if (loading) {
		return <Loader />;
	}

	return (
		<main className='gradient min-vh-100'>
			<div className='container py-5 mt-5'>
				<h1 className='text-center bg-light rounded'>כל ההזמנות</h1>
				{/* שדה חיפוש */}
				<Form className='text-center text-light p-3 my-3 m-auto' role='search'>
					<h3>חפש הזמנה</h3>
					<input
						autoComplete='on'
						className='form-control me-2 w-50 mb-5 mt-3 border border-success'
						type='search'
						placeholder='חפש לפי שם או אימייל'
						aria-label='חפש לפי שם או אימייל'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</Form>
				<div className='row'>
					{filteredOrders.length ? (
						filteredOrders.map((order) => (
							<div key={order.createdAt} className='mb-4 col-md-6 col-lg-3'>
								<div className='card p-4 shadow'>
									<h5 className='card-title text-center bg-primary text-white p-2 rounded'>
										<strong>מ"ס הזמנה:</strong> {order.orderNumber}
									</h5>
									<div className='d-flex flex-column align-items-start mb-3'>
										<div className='my-1'>
											<strong className=' me-1'>ID מזמין</strong>
											<span className='fw-bold rounded'>
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
																			order
																				.orderNumber
																	  ] === "Preparing"
																	? "text-primary"
																	: orderStatuses[
																				order
																					.orderNumber
																		  ] ===
																		  "Cancelled"
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
														: orderStatuses[
																	order.orderNumber
															  ] === "Delivered"
															? "נשלח"
															: orderStatuses[
																		order.orderNumber
																  ] === "Preparing"
																? "ההזמנה שלך בהכנה"
																: orderStatuses[
																			order
																				.orderNumber
																	  ] === "Cancelled"
																	? "בוטל"
																	: ""}
											</span>
										</div>
									</div>

									{((auth && auth.role === RoleType.Admin) ||
										(auth && auth.role === RoleType.Moderator)) && (
										<div className='d-flex align-items-center justify-content-around mb-3'>
											<button
												onClick={() =>
													handleStatus(
														"Preparing",
														order.orderNumber,
													)
												}
												className='btn btn-primary'
												disabled={
													order.status === "Preparing" ||
													order.status === "Delivered" ||
													order.status === "Shipped"
												}
											>
												{statusLoading[order.orderNumber]
													? "טוען..."
													: "הכנה"}
											</button>
											<button
												onClick={() =>
													handleStatus(
														"Delivered",
														order.orderNumber,
													)
												}
												className='btn btn-info'
												disabled={
													order.status === "Delivered" ||
													order.status === "Shipped"
												}
											>
												{statusLoading[order.orderNumber]
													? "טוען..."
													: "נשלח"}
											</button>
											<button
												onClick={() =>
													handleStatus(
														"Shipped",
														order.orderNumber,
													)
												}
												className='btn btn-success'
												disabled={order.status === "Shipped"}
											>
												{statusLoading[order.orderNumber]
													? "טוען..."
													: "נמסר"}
											</button>
											<button
												onClick={() =>
													handleStatus(
														"Cancelled",
														order.orderNumber,
													)
												}
												className='btn btn-danger'
												disabled={
													statusLoading[order.orderNumber]
												}
											>
												{statusLoading[order.orderNumber]
													? "טוען..."
													: "ביטול"}
											</button>
										</div>
									)}

									<div className='mb-3'>
										<strong>שיטת תשלום:</strong>{" "}
										{order.payment ? (
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
										{order.selfCollection ? (
											<span className='text-info'>
												{fontAwesomeIcon.boxOpen}
												איסוף עצמי
											</span>
										) : order.delivery ? (
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
											{order.totalAmount.toLocaleString("he-IL", {
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

				<div className='text-center'>
					<NavigathionButtons />
				</div>
			</div>
		</main>
	);
};

export default AllTheOrders;
