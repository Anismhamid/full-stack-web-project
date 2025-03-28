import {FunctionComponent, useState, useEffect} from "react";
import {getUserOrders} from "../services/orders"; // Make sure you have an API service for fetching orders
import useToken from "../hooks/useToken";

interface OrdersProps {}

const Orders: FunctionComponent<OrdersProps> = () => {
	const {decodedToken} = useToken();
	const [orders, setOrders] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (decodedToken._id) {
			getUserOrders()
				.then((orders) => {
					setOrders(orders);
					setLoading(false);
				})
				.catch((error) => {
					console.error("Failed to fetch orders:", error);
					setLoading(false);
				});
		}
	}, [decodedToken]);

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
				<h1 className='text-center'>הזמנות שלי</h1>

				{orders.length > 0 ? (
					<ul className='list-group'>
						{orders.map((order, index) => (
							<li
								key={order._id || index}
								className='list-group-item d-flex justify-content-between align-items-center'
							>
								<div>
									<strong>הזמנה מספר: {order.orderNumber}</strong>
									<p>
										תאריך:{" "}
										{new Date(order.date).toLocaleDateString("he-IL")}
									</p>
									<p>סטטוס: {order.status}</p>
								</div>
								<button className='btn btn-info btn-sm'>פרטים</button>
							</li>
						))}
					</ul>
				) : (
					<h5 className='text-danger'>אין הזמנות עדיין</h5>
				)}
			</div>
		</main>
	);
};

export default Orders;
