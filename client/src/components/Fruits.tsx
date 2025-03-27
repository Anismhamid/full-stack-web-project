import {FunctionComponent, useEffect, useState} from "react";
import {getFruits} from "../services/fruitsServices";
import {Fruit} from "../interfaces/Fruit";
import {handleAddToCart, handleQuantity} from "../helpers/fruitesFunctions";
import ForAllModal from "../atoms/Modal";
import useToken from "../hooks/useToken";

interface FruitsProps {}

const Fruits: FunctionComponent<FruitsProps> = () => {
	const [fruits, setFruits] = useState<Fruit[]>([]);
	const [quantities, setQuantities] = useState<{[key: string]: number}>({});
	const [onShowModal, setOnShowModal] = useState<boolean>(false);
	const {decodedToken} = useToken();

	const OnShowCardModal = () => setOnShowModal(true);
	const OnHideCardModal = () => setOnShowModal(false);

	const handleAdd = (
		product_name: string,
		quantity: {[key: string]: number},
		price: number,
		product_image: string,
		sale: boolean,
	) => {
		const productQuantity = quantity[product_name]; // Access the quantity of the specific product
		if (!productQuantity) {
			// If the quantity for this product is not found, handle the case
		} else if (!decodedToken) {
			OnShowCardModal();
		} else {
			handleAddToCart(
				setQuantities,
				product_name,
				productQuantity,
				price,
				product_image,
				sale,
			);
		}
	};

	useEffect(() => {
		getFruits()
			.then((res) => {
				setFruits(res);
				const initialQuantities = res.reduce(
					(acc: any, fruit: {product_name: string | number}) => {
						acc[fruit.product_name] = 1;
						return acc;
					},
					{},
				);
				setQuantities(initialQuantities);
			})
			.catch((err) => {
				console.log(err);
			});
		window.scroll(0, 0);
	}, []);

	return (
		<main>
			<div className='container py-5'>
				<h1 className='display-1 text-center'>
					הפירות שלנו - טריים, איכותיים ומגוונים!
				</h1>
				<hr />
				<p className='text-center my-5'>
					כאן תוכלו למצוא מגוון רחב של פירות טריים, שנקטפו ממש עכשיו מהחקלאים
					המקומיים שלנו. אנו מבטיחים איכות גבוהה ושירות מצוין כדי שתהנו מכל פרי
					בקלות ובנוחות. יש לנו פירות בכל הצבעים והטעמים, כך שכל אחד יכול למצוא
					את המועדף עליו
				</p>

				<div className='row m-auto'>
					{fruits.map((fruit) => {
						const fruitQuantity = quantities[fruit.product_name] || 1;
						return (
							<div
								className='col-md-4 col-lg-3 col-sm-10 m-auto'
								key={fruit._id}
							>
								<div className='card mb-3'>
									<div className='card-img-top object-fit-cover overflow-hidden'>
										<img
											style={{
												height: "200px",
												width: "100%",
											}}
											className=' img-thumbnail rounded-3'
											src={fruit.image_url}
											alt={fruit.product_name}
										/>
									</div>
									<div className='card-body'>
										<h5 className='card-title'>
											{fruit.product_name}
										</h5>
										<hr />
										<h5 className='text-success text-center'>
											במלאי - {fruit.quantity_in_stock} ק"ג
										</h5>
										<hr />
										<h5 className='card-text text-center'>
											{fruit.price.toLocaleString("he-IL", {
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
														fruit.product_name,
													)
												}
												className='btn btn-info text-dark fw-bold'
											>
												-
											</button>
											<h5 className='text-decoration-underline'>
												<b>{fruitQuantity}</b>
											</h5>
											<button
												onClick={() =>
													handleQuantity(
														setQuantities,
														"+",
														fruit.product_name,
													)
												}
												className='btn btn-info text-dark fw-bold'
											>
												+
											</button>
										</div>
										<div className='card-footer d-flex justify-content-between align-items-center'>
											<button
												onClick={() =>
													handleAdd(
														fruit.product_name,
														quantities,
														fruit.price,
														fruit.image_url,
														fruit.sale || false,
													)
												}
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

export default Fruits;
