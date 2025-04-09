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
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import {fontAwesomeIcon} from "../FontAwesome/Icons";
import {path} from "../routes/routes";
import RoleType from "../interfaces/UserType";
import Fish from "./Fish";
import Dairy from "./Dairy";
import Meat from "./Meat";
import Spices from "./Spices";
import Bakery from "./Bakery";
import Beverages from "./Beverages";
import Frozen from "./Frozen";
import Snacks from "./Snacks";

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
			const productInDiscount = product.sale ? "מבצע" : false || "";

			return (
				productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(searchQuery && productPrice.toString() === searchQuery) ||
				(searchQuery && productInDiscount.toString() === searchQuery)
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

	const actions = [
		{
			icon: fontAwesomeIcon.CartInoc,
			name: "מוצר חדש",
			addClick: () => showAddProductModal(),
		},
		{
			icon: fontAwesomeIcon.ordersList,
			name: "הזמנות",
			addClick: () => navigate(path.AllTheOrders),
		},
	];

	if (loading) {
		return <Loader />;
	}

	return (
		<main className='gradient min-vh-100 main'>
			{((auth && auth.role === RoleType.Admin) ||
				(auth && auth.role === RoleType.Moderator)) && (
				<>
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
				</>
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

					<div className='row m-auto'>
						{searchQuery.length ? (
							filteredProducts.map((fruit) => {
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
													במלאי - {fruit.quantity_in_stock} ק"ג
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
																		currency: "ILS",
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
															).toLocaleString("he-IL", {
																style: "currency",
																currency: "ILS",
															})}
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
															fruit.quantity_in_stock <= 0
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
															fruit.quantity_in_stock <= 0
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
															fruit.quantity_in_stock <= 0
																? true
																: false
														}
														className={` w-100 ${
															fruit.quantity_in_stock <= 0
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
							<p className=' rounded border border-light mt-3 text-center lead'>
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
			</div>

			<div className='container'>
				{/* Discounts and Offers */}
				<DiscountsAndOffers />

				{/* Fruits  */}
				<p className=' bg-transparent text-light fs-1'>פירות</p>
				<hr className=' text-light' />

				<Fruits />

				{/* Vegetable section */}
				<p className=' bg-transparent text-light fs-1'>ירקות</p>
				<hr className=' text-light' />

				<Vegentable />

				{/* fish */}
				<p className=' bg-transparent text-light fs-1'>דגים</p>
				<hr className=' text-light' />
				<Fish />

				{/* dairy */}
				<Dairy />

				{/* meat */}
				<p className=' bg-transparent text-light fs-1'>ירקות</p>
				<hr className=' text-light' />
				<Meat />

				{/* spices */}
				<p className=' bg-transparent text-light fs-1'>ירקות</p>
				<hr className=' text-light' />
				<Spices />

				{/* spices */}
				<p className=' bg-transparent text-light fs-1'>ירקות</p>
				<hr className=' text-light' />
				<Spices />

				{/* bakery */}
				<p className=' bg-transparent text-light fs-1'>ירקות</p>
				<hr className=' text-light' />
				<Bakery />

				{/* beverages */}
				<p className=' bg-transparent text-light fs-1'>ירקות</p>
				<hr className=' text-light' />
				<Beverages />

				{/* forzen */}
				<p className=' bg-transparent text-light fs-1'>ירקות</p>
				<hr className=' text-light' />
				<Frozen />

				{/* snacks */}
				<p className=' bg-transparent text-light fs-1'>ירקות</p>
				<hr className=' text-light' />
				<Snacks />

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
