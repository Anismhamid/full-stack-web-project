import {FunctionComponent} from "react";
import {useParams} from "react-router-dom";
import Loader from "../atoms/loader/Loader";
import useOrderDetails from "../hooks/useOrderDetails";

interface OrderDetailsProps {}

const OrderDetails: FunctionComponent<OrderDetailsProps> = () => {
	const {orderNumber} = useParams<{orderNumber: string}>();
	const {cartItems, loading, error} = useOrderDetails(orderNumber as string);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!cartItems || !cartItems.products) {
		return <div>No products found in this order.</div>;
	}

	return (
		<main className='gradient min-vh-100'>
			<div className='container'>
				<h1 className='text-center mb-4'>Order Details</h1>
				<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
					{cartItems.products.map((product, index) => {
						const {product_name, product_image, quantity, sale, discount} =
							product;
						return (
							<>
								<div key={index} className='col'>
									<div className='card h-100 shadow-sm border-0'>
										<img
											src={product_image}
											alt={product_name}
											className='card-img-top'
											style={{
												height: "200px",
												objectFit: "cover",
											}}
										/>
										<div className='card-body d-flex flex-column'>
											<h5 className='card-title'>{product_name}</h5>
											<h5>{sale ? `מבצע${discount}` : ""}</h5>
											<h6 className='card-subtitle mb-2 text-muted'>
												כמות: {quantity}
											</h6>
										</div>
									</div>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</main>
	);
};

export default OrderDetails;
