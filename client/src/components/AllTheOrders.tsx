import {FunctionComponent, useEffect, useState} from "react";
import {Order} from "../interfaces/Order";
import {getAllOrders, patchStatus} from "../services/orders";
import {useNavigate} from "react-router-dom";
import {useUser} from "../context/useUSer";
import Loader from "../atoms/loader/Loader";
import {fontAwesomeIcon} from "../FontAwesome/Icons";
import NavigathionButtons from "../atoms/NavigathionButtons";
import {path} from "../routes/routes";

interface AllTheOrdersProps {}

const AllTheOrders: FunctionComponent<AllTheOrdersProps> = () => {
	const navigate = useNavigate();
	const {auth} = useUser();
	const [loading, setLoading] = useState<boolean>(true);
	const [orderStatuses, setOrderStatuses] = useState<{[orderNumber: string]: string}>(
		{},
	);
	const [allOrders, setAllOrders] = useState<Order[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredUsers = allOrders.filter((order) =>
		order.orderNumber.toUpperCase().includes(searchQuery.toLowerCase()),
	);

	useEffect(() => {
		if (auth && auth.role === "Admin") {
			getAllOrders()
				.then((res) => {
					setAllOrders(res);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			navigate(path.Home);
			window.scroll(0, 0);
		}
	}, [searchQuery]);

	const totalAmount = allOrders.reduce((total, item) => {
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
				<h1 className='text-center bg-light rounded'>כל ההזמנות</h1>
				{/* שדה חיפוש */}
				<form className='text-center text-light' role='search'>
					<h3>חפש הזמנה</h3>
					<input
						autoComplete='on'
						className='form-control me-2 w-100 mb-5 mt-3 border border-success'
						type='search'
						placeholder='חפש לפי שם או אימייל'
						aria-label='חפש לפי שם או אימייל'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</form>
				<div className='row'>
					{filteredUsers.length ? (
						filteredUsers.map((order, index) => (
							<div key={order.createdAt} className='mb-4 col-md-6 col-lg-3'>
								<div className=' card p-4 shadow-sm'>
									<h5 className='card-title text-center bg-primary text-white p-2 rounded'>
										הזמנה: {index + 1}
									</h5>
									<div className='d-flex flex-column align-items-start mb-3'>
										<div>
											<strong>מ"ס הזמנה:</strong>{" "}
											{order.orderNumber}
										</div>
										<div className=' my-1'>
											<strong>שם מזמין:</strong>
											<span className='font-weight-bold'>
												{auth?.name.first} {auth?.name.last}
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
										(auth && auth.role === "Moderator")) && (
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

export default AllTheOrders;
