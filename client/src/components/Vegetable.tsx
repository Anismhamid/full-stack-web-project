import {FunctionComponent, useEffect, useState} from "react";
import {getVegentable} from "../services/fruitsServices";
import {Fruit} from "../interfaces/Fruit";
import {handleAddToCart, handleQuantity} from "../helpers/fruitesFunctions";
import ForAllModal from "../atoms/Modal";

interface VegentableProps {}

const Vegentable: FunctionComponent<VegentableProps> = () => {
	const [Vegentable, setVegentable] = useState<Fruit[]>([]);
	const [quantities, setQuantities] = useState<{[key: string]: number}>({});
	const [onShowModal, setOnShowModal] = useState<boolean>(false);

	const OnShowCardModal = () => setOnShowModal(true);
	const OnHideCardModal = () => setOnShowModal(false);

	useEffect(() => {
		getVegentable()
			.then((res) => {
				setVegentable(res);
				const initialQuantities = res.reduce(
					(acc: any, Vegentable: {product_name: string | number}) => {
						acc[Vegentable.product_name] = 1;
						return acc;
					},
					{},
				);
				setQuantities(initialQuantities);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleAdd = (
		product_name: string,
		quantity: {[key: string]: number},
		price: number,
		product_image: string,
		sale: boolean,
	) => {
		const productQuantity = quantity[product_name];

		handleAddToCart(
			setQuantities,
			product_name,
			productQuantity,
			price,
			product_image,
			sale,
		);
	};

	return (
		<main>
			<div className='container m-auto'>
				<h1 className='text-center display-1'>
					הירקות שלנו - טריים ובריאים לכל משפחה!
				</h1>
				<hr />
				<p className='text-center my-5'>
					הירקות שלנו גדלים בשדות פוריים ואיכותיים, עם דגש על טריות ובריאות.
					אנחנו מביאים לכם את הירקות הטריים ביותר, שישדרגו כל ארוחה ויעניקו לכם
					את הטוב ביותר. תמצאו כאן ירקות בעונה, במיוחד עבורכם
				</p>
				<div className='row m-auto'>
					{Vegentable.map((Vegentable) => {
						const VegentableQuantity =
							quantities[Vegentable.product_name] || 1;
						return (
							<div
								className='col-md-4 col-lg-3 col-sm-10 m-auto'
								key={Vegentable._id}
							>
								<div className='card mb-3'>
									<div className='card-img-top object-fit-cover overflow-hidden'>
										<img
											style={{
												height: "200px",
												width: "100%",
											}}
											className=' img-thumbnail rounded-3'
											src={Vegentable.image_url}
											alt={Vegentable.product_name}
										/>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>
											{Vegentable.product_name}
										</h5>
										<hr />
										<h5 className='text-success text-center'>
											במלאי - {Vegentable.quantity_in_stock} ק"ג
										</h5>
										<hr />
										<h5 className='card-text text-center'>
											{Vegentable.price.toLocaleString("he-IL", {
												style: "currency",
												currency: "ILS",
											})}
										</h5>
										<h6 className=' text-danger'>ל / 1-ק"ג</h6>
										<hr />
										<div className='d-flex align-items-center justify-content-around'>
											<button
												onClick={() =>
													handleQuantity(
														setQuantities,
														"-",
														Vegentable.product_name,
													)
												}
												className='btn btn-info text-dark fw-bold'
											>
												-
											</button>
											<h5 className='text-decoration-underline'>
												<b>{VegentableQuantity}</b>
											</h5>
											<button
												onClick={() =>
													handleQuantity(
														setQuantities,
														"+",
														Vegentable.product_name,
													)
												}
												className='btn btn-info text-dark fw-bold'
											>
												+
											</button>
										</div>
										<div className='card-footer d-flex justify-content-between align-items-center'>
											<button
												onClick={() => {
													handleAdd(
														Vegentable.product_name,
														quantities,
														Vegentable.price,
														Vegentable.image_url,
														Vegentable.sale || false,
													);
												}}
												className='btn btn-success'
											>
												הוספה לסל
											</button>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<ForAllModal show={onShowModal} onHide={OnHideCardModal} />
		</main>
	);
};

export default Vegentable;
