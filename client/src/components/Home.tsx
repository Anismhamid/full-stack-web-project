import {FunctionComponent, useEffect, useMemo, useState} from "react";
import DiscountsAndOffers from "./DiscountsAndOffers";
import {useUser} from "../context/useUSer";
import AddProdutModal from "../atoms/AddProdutModal";
import {useNavigate} from "react-router-dom";
import {getAllProducts} from "../services/productsServices";
import {Products} from "../interfaces/Products";
import {handleAddToCart, handleQuantity} from "../helpers/fruitesFunctions";
import Loader from "../atoms/loader/Loader";
import ForAllModal from "../atoms/LoginModal";
import {SpeedDial, SpeedDialIcon, SpeedDialAction, Button} from "@mui/material";
import {fontAwesomeIcon} from "../FontAwesome/Icons";
import {path} from "../routes/routes";
import RoleType from "../interfaces/UserType";

interface HomeProps {}

/**
 * Home page
 * @returns All products by categories
 */

const Home: FunctionComponent<HomeProps> = () => {
	const [quantities, setQuantities] = useState<{[key: string]: number}>({});
	const [onShowAddModal, setOnShowAddModal] = useState<boolean>(false);
	const [onShowModal, setOnShowModal] = useState<boolean>(false);
	const [products, setProducts] = useState<Products[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [loading, setLoading] = useState(true);
	const {auth, isLoggedIn} = useUser();
	const navigate = useNavigate();
	const [visibleProducts, setVisibleProducts] = useState<Products[]>([]);
	const [visibleCount, setVisibleCount] = useState(15);

	const OnShowCartModal = () => setOnShowModal(true);
	const OnHideCartModal = () => setOnShowModal(false);

	const showAddProductModal = () => setOnShowAddModal(true);
	const hideAddProductModal = () => setOnShowAddModal(false);

	useEffect(() => {
		getAllProducts()
			.then((products) => {
				setProducts(products);
				setVisibleProducts(products.slice(0, 15));
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
			const productInDiscount = product.sale ? "מבצע" :  "";

			return (
				productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(searchQuery && productPrice.toString().includes(searchQuery)) ||
				(searchQuery && productInDiscount.toString().includes(searchQuery))
			);
		});
	}, [products, searchQuery]);

	useEffect(() => {
		const dataToDisplay = searchQuery
			? filteredProducts
			: products.slice(0, visibleCount);

		setVisibleProducts(dataToDisplay);
	}, [products, searchQuery, filteredProducts, visibleCount]);

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

	const actions = [
		{
			icon: fontAwesomeIcon.CartInoc,
			name: "מוצר חדש",
			addClick: () => showAddProductModal(),
		},
		
	];

	if (loading) {
		return <Loader />;
	}

	return (
		<main className='min-vh-100'>
			{((auth && auth.role === RoleType.Admin) ||
				(auth && auth.role === RoleType.Moderator)) && (
				<SpeedDial
					ariaLabel='SpeedDial basic example'
					sx={{position: "fixed", bottom: 90, right: 16}}
					icon={<SpeedDialIcon />}
				>
					{actions.map((action) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							tooltipOpen={true}
							onClick={action.addClick}
						/>
					))}
				</SpeedDial>
			)}

			{/* Search and filter products */}
			<div className='container'>
				<div style={{marginTop: 0}} className=''>
					<div className='w-50 m-auto'>
						<input
							type='search'
							placeholder='חפש מוצר...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className=' border border-5 border-success form-control mt-5'
							autoComplete='on'
						/>
					</div>

					{/* Discounts Section */}
					{!searchQuery && <DiscountsAndOffers />}

					<div className='row'>
						{visibleProducts.length > 0 ? (
							visibleProducts.map((product) => {
								const productQuantity =
									quantities[product.product_name] || 1;
								return (
									<div
										className='col-md-4 mb-5 col-lg-3 col-sm-10'
										key={product._id}
									>
										<div className='card h-100'>
											<div className='card-img-top'>
												<img
													style={{
														height: "300px",
														width: "100%",
													}}
													className=' img-thumbnail rounded-3'
													src={product.image_url}
													alt={`Image of ${product.product_name}`} // Improve alt text
												/>
											</div>

											<div className='card-body'>
												<h5 className='card-title'>
													{product.product_name}
												</h5>
												<hr />
												<h5 className='text-success text-center'>
													במלאי - {product.quantity_in_stock}{" "}
													ק"ג
												</h5>
												<hr />

												{product.sale ? (
													<>
														<h5 className=' text-center'>
															מחיר לפני:
															<s className=' ms-2'>
																{product.price}
															</s>
														</h5>
														<h6 className=' text-center'>
															מחיר:
															{(
																product.price -
																(product.discount
																	? (product.price *
																			product.discount) /
																		100
																	: 0)
															).toLocaleString("he-IL", {
																style: "currency",
																currency: "ILS",
															})}
															<span className=' d-block m-2 text-center text-danger'>
																{product.discount}% מבצע
															</span>
														</h6>
													</>
												) : (
													<h5 className='card-text text-center'>
														{product.price}
													</h5>
												)}

												<h6 className=' text-primary'>
													ל / 1-ק"ג
												</h6>
												<div className='d-flex align-items-center justify-content-evenly'>
													<button
														disabled={
															product.quantity_in_stock <= 0
																? true
																: false
														}
														onClick={() =>
															handleQuantity(
																setQuantities,
																"-",
																product.product_name,
															)
														}
														className='btn btn-info text-dark fw-bold'
													>
														-
													</button>
													<h5 className='text-decoration-underline'>
														<b>{productQuantity}</b>
													</h5>
													<button
														disabled={
															product.quantity_in_stock <= 0
																? true
																: false
														}
														onClick={() => {
															handleQuantity(
																setQuantities,
																"+",
																product.product_name,
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
																product.product_name,
																quantities,
																product.price,
																product.image_url,
																product.sale || false,
																product.discount || 0,
															);
														}}
														disabled={
															product.quantity_in_stock <= 0
																? true
																: false
														}
														className={` w-100 ${
															product.quantity_in_stock <= 0
																? "btn btn-danger"
																: "btn btn-success"
														}`}
													>
														{product.quantity_in_stock <= 0
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
							<p className='rounded border border-light mt-3 text-center lead'>
								חפש לפי/
								<strong className='text-danger fw-bold mx-1'>
									שם מוצר
								</strong>
								/
								<strong className='text-danger fw-bold mx-1'>
									מחיר מוצר
								</strong>
								/
								<strong className='text-danger fw-bold ms-1'>
									מילת מבצע
								</strong>
							</p>
						)}
					</div>
				</div>
				{/* Show More Button */}
				{!searchQuery && visibleCount < products.length && (
					<div className='text-center mt-4'>
						<Button
							color='primary'
							variant='contained'
							onClick={() => setVisibleCount((prev) => prev + 15)}
						>
							הצג עוד מוצרים
						</Button>
					</div>
				)}
			</div>

			<div className='container'>
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
