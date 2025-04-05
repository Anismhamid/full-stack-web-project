import {FunctionComponent, useEffect, useMemo, useState} from "react";
import Fruits from "./Fruits";
import Vegentable from "./Vegetable";
import DiscountsAndOffers from "./DiscountsAndOffers";
import {useUser} from "../context/useUSer";
import AddProdutModal from "../atoms/AddProdutModal";
import {useNavigate} from "react-router-dom";
import {getAllProducts} from "../services/productsServices";
import {Products} from "../interfaces/Products";
import {handleAddToCart, handleQuantity} from "../helpers/fruitesFunctions";
import Loader from "../atoms/loader/Loader";
import ForAllModal from "../atoms/LoginModal";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	const [quantities, setQuantities] = useState<{[key: string]: number}>({});
	const [onShowAddModal, setOnShowAddModal] = useState<boolean>(false);
	const [onShowModal, setOnShowModal] = useState<boolean>(false);
	const [products, setProducts] = useState<Products[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(true);
	const {auth, isLoggedIn} = useUser();
	const navigate = useNavigate();

	const OnShowCartModal = () => setOnShowModal(true);
	const OnHideCartModal = () => setOnShowModal(false);

	const showAddProductModal = () => setOnShowAddModal(true);
	const hideAddProductModal = () => setOnShowAddModal(false);

	useEffect(() => {
		getAllProducts()
			.then((products) => {
				setProducts(products);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const productName = product.product_name || "";
			const productPrice = product.price || "";

			return (
				productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(searchQuery && productPrice.toString() === searchQuery)
			);
		});
	}, [products, searchQuery]);

	const handleAdd = (
		product_name: string,
		quantity: {[key: string]: number},
		price: number,
		product_image: string,
		sale: boolean,
		discount: number,
	) => {
		const productQuantity = quantity[product_name]; // Access the quantity of the specific product
		if (!isLoggedIn) {
			OnShowCartModal();
		} else {
			handleAddToCart(
				setQuantities,
				product_name,
				productQuantity,
				price - (price * discount) / 100,
				product_image,
				sale,
				discount,
			);
		}
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<main className='gradient min-vh-100 main'>
			{/* Admin / Moderator Options */}
			<div className=' container'>
				{((auth && auth.role === "Admin") ||
					(auth && auth.role === "Moderator")) && (
					<div className='d-flex align-items-center mt-5 p-5 justify-content-around mt-5'>
						<button className='btn btn-dark' onClick={showAddProductModal}>
							הוספת מוצר
						</button>
						<button
							className='btn btn-info'
							onClick={() => navigate(`/all-orders`)}
						>
							כל ההזמנות
						</button>
					</div>
				)}

				{/* Search and filter products */}
				<section className='my-5'>
					<div className=' container'>
						<div className='w-50 m-auto'>
							<input
								type='search'
								placeholder='חפש מוצר...'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className=' border border-5 border-success form-control me-2 mb-5 mt-3'
								autoComplete='on'
							/>
						</div>

						<div className='row m-auto'>
							{searchQuery.length ? (
								filteredProducts.map((fruit) => {
									const fruitQuantity =
										quantities[fruit.product_name] || 1;
									return (
										<div
											className='col-md-4 col-lg-3 col-sm-10 m-auto'
											key={fruit._id}
										>
											<div className='card mb-3'>
												<div className='card-img-top object-fit-cover overflow-hidden'>
													<img
														style={{
															height: "300px",
															width: "100%",
														}}
														className=' img-thumbnail rounded-3'
														src={fruit.image_url}
														alt={`Image of ${fruit.product_name}`} // Improve alt text
													/>
												</div>

												<div className='card-body'>
													<h5 className='card-title'>
														{fruit.product_name}
													</h5>
													<hr />
													<h5 className='text-success text-center'>
														במלאי - {fruit.quantity_in_stock}{" "}
														ק"ג
													</h5>
													<hr />

													{fruit.sale ? (
														<>
															<h5 className=' text-center'>
																מחיר לפני:
																<s className=' ms-2'>
																	{fruit.price.toLocaleString(
																		"he-IL",
																		{
																			style: "currency",
																			currency:
																				"ILS",
																		},
																	)}
																</s>
															</h5>
															<h6 className=' text-center'>
																מחיר:
																{(
																	fruit.price -
																	(fruit.discount
																		? (fruit.price *
																				fruit.discount) /
																		  100
																		: 0)
																).toLocaleString(
																	"he-IL",
																	{
																		style: "currency",
																		currency: "ILS",
																	},
																)}
																<span className=' d-block m-2 text-center text-danger'>
																	{fruit.discount}% מבצע
																</span>
															</h6>
														</>
													) : (
														<h5 className='card-text text-center'>
															{fruit.price.toLocaleString(
																"he-IL",
																{
																	style: "currency",
																	currency: "ILS",
																},
															)}
														</h5>
													)}

													<h6 className=' text-primary'>
														ל / 1-ק"ג
													</h6>
													<div className='d-flex align-items-center justify-content-evenly'>
														<button
															disabled={
																fruit.quantity_in_stock <=
																0
																	? true
																	: false
															}
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
															disabled={
																fruit.quantity_in_stock <=
																0
																	? true
																	: false
															}
															onClick={() => {
																handleQuantity(
																	setQuantities,
																	"+",
																	fruit.product_name,
																);
															}}
															className='btn btn-info text-dark fw-bold'
														>
															+
														</button>
													</div>
													<div className='card-footer'>
														<button
															onClick={() => {
																handleAdd(
																	fruit.product_name,
																	quantities,
																	fruit.price,
																	fruit.image_url,
																	fruit.sale || false,
																	fruit.discount || 0,
																);
															}}
															disabled={
																fruit.quantity_in_stock <=
																0
																	? true
																	: false
															}
															className={` w-100 ${
																fruit.quantity_in_stock <=
																0
																	? "btn btn-danger"
																	: "btn btn-success"
															}`}
														>
															{fruit.quantity_in_stock <= 0
																? "אזל מהמלאי"
																: "הוספה לסל"}
														</button>
													</div>
												</div>
											</div>
										</div>
									);
								})
							) : (
								<></>
							)}
						</div>
					</div>
				</section>
			</div>

			<div className='container'>
				{/* Discounts and Offers */}
				<DiscountsAndOffers />

				{/* Fruits section */}
				<section className='my-5'>
					<Fruits />
				</section>

				{/* Vegetable section */}
				<Vegentable />

				{/* Customer support section */}
				<section className='my-5'>
					<h2 className='text-center mb-4'>אנו כאן לשירותכם!</h2>
					<p className='text-center mb-4'>
						אם יש לכם שאלות על המוצרים, המבצעים, או איך לבצע הזמנה, אל תהססו
						לפנות אלינו! צוות שירות הלקוחות שלנו זמין 24/7 כדי לעזור לכם.
						אנחנו כאן כדי להבטיח שתהנו מכל רכישה ושזה יהיה תהליך חלק ונעים
						עבורכם.
					</p>
				</section>
			</div>

			{/* Add product modal */}
			<AddProdutModal show={onShowAddModal} onHide={hideAddProductModal} />
			<ForAllModal show={onShowModal} onHide={OnHideCartModal} />
		</main>
	);
};

export default Home;
