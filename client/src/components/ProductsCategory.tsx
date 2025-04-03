import {FunctionComponent, useEffect, useState} from "react";
import {getProductsByCategory} from "../services/productsServices"; // פונקציה כללית שמביאה מוצרים לפי קטגוריה
import {Products} from "../interfaces/Products";
import {handleAddToCart, handleQuantity} from "../helpers/fruitesFunctions";
import ForAllModal from "../atoms/LoginModal";
import {useUser} from "../context/useUSer";
import DeleteProductButton from "../atoms/DeleteProductButton";
import Loader from "../atoms/loader/Loader";

interface ProductCategoryProps {
	category: string;
}

const ProductCategory: FunctionComponent<ProductCategoryProps> = ({category}) => {
	const [products, setProducts] = useState<Products[]>([]);
	const [quantities, setQuantities] = useState<{[key: string]: number}>({});
	const [onShowModal, setOnShowModal] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const {auth, isLoggedIn} = useUser();
	const [visibleProducts, setVisibleProducts] = useState<Products[]>([]); // To hold the visible products
	const [showMoreLoading, setShowMoreLoading] = useState(false); // For showing loading state for show more

	const OnShowCartModal = () => setOnShowModal(true);
	const OnHideCartModal = () => setOnShowModal(false);

	const handleAdd = (
		product_name: string,
		quantity: {[key: string]: number},
		price: number,
		product_image: string,
		sale: boolean,
		discount: number,
	) => {
		const productQuantity = quantity[product_name];
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

	useEffect(() => {
		getProductsByCategory(category)
			.then((res) => {
				setProducts(res);

				setVisibleProducts(res.slice(0, 6));

				const initialQuantities = res.reduce(
					(acc: any, product: {product_name: string}) => {
						acc[product.product_name] = 1;
						return acc;
					},
					{},
				);
				setQuantities(initialQuantities);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => setLoading(false));
	}, [category]);

	const handleShowMore = () => {
		setShowMoreLoading(true);
		// Load more products by slicing the products array
		const nextVisibleCount = visibleProducts.length + 9;
		const newVisibleProducts = products.slice(0, nextVisibleCount);
		setVisibleProducts(newVisibleProducts);
		setShowMoreLoading(false);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<main className='gradient min-vh-100'>
			<div className='container my-5'>
				<div className='row m-auto'>
					{visibleProducts.map((product) => {
						const productQuantity = quantities[product.product_name] || 1;
						return (
							<div
								className='col-md-4 my-3 col-lg-3 col-sm-10 m-auto'
								key={product.product_name}
							>
								<div style={{}} className='card mb-3 h-100'>
									<div className='card-img-top object-fit-cover overflow-hidden'>
										<img
											style={{
												height: "200px",
												width: "100%",
											}}
											className='img-thumbnail rounded-3'
											src={product.image_url}
											alt={product.product_name}
										/>
									</div>

									<div className='card-body'>
										<h5 className='card-title'>
											{product.product_name}
										</h5>
										<hr />
										<h5 className='text-success text-center'>
											במלאי - {product.quantity_in_stock} יחידות
										</h5>
										<hr />

										{product.sale ? (
											<>
												<h5 className='text-center'>
													מחיר לפני:
													<s className='ms-2'>
														{product.price.toLocaleString(
															"he-IL",
															{
																style: "currency",
																currency: "ILS",
															},
														)}
													</s>
												</h5>
												<h6 className='text-center'>
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
													<span className='d-block m-2 text-center text-danger'>
														{product.discount}% מבצע
													</span>
												</h6>
											</>
										) : (
											<h5 className='card-text text-center'>
												{product.price}
											</h5>
										)}

										<h6 className='text-primary'>ל / יחידה</h6>
										<div className='d-flex align-items-center justify-content-evenly'>
											<button
												disabled={product.quantity_in_stock <= 0}
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
												disabled={product.quantity_in_stock <= 0}
												onClick={() =>
													handleQuantity(
														setQuantities,
														"+",
														product.product_name,
													)
												}
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
												disabled={product.quantity_in_stock <= 0}
												className={`w-100 ${
													product.quantity_in_stock <= 0
														? "btn btn-danger"
														: "btn btn-success"
												}`}
											>
												{product.quantity_in_stock <= 0
													? "אזל מהמלאי"
													: "הוספה לסל"}
											</button>
											{(auth?.isAdmin || auth?.isModerator) && (
												<DeleteProductButton
													product_name={product.product_name}
												/>
											)}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				{/* Show More Button */}
				{products.length > visibleProducts.length && (
					<div className='text-center'>
						<button
							onClick={handleShowMore}
							className='btn btn-outline-primary'
							disabled={showMoreLoading}
						>
							{showMoreLoading ? "טוען..." : "הצג עוד"}
						</button>
					</div>
				)}
			</div>
			<ForAllModal show={onShowModal} onHide={OnHideCartModal} />
		</main>
	);
};

export default ProductCategory;
