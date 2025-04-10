import {FunctionComponent, useEffect, useState} from "react";
import {Products} from "../interfaces/Products";
import {getProductsInDiscount} from "../services/productsServices";
import {Link} from "react-router-dom";
import {productsPathes} from "../routes/routes";
import Loader from "../atoms/loader/Loader";

interface DiscountsAndOffersProps {}

const DiscountsAndOffers: FunctionComponent<DiscountsAndOffersProps> = () => {
	const [productsInDiscount, setProductsInDiscount] = useState<Products[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	// Category to path mapping
	const categoryToPath: Record<string, string> = {
		Fruit: productsPathes.Fruits,
		Vegetable: productsPathes.Vegetable,
		Fish: productsPathes.fish,
		Dairy: productsPathes.dairy,
		Meat: productsPathes.meat,
		Spices: productsPathes.spices,
		Bakery: productsPathes.bakery,
		Beverages: productsPathes.beverages,
		Frozen: productsPathes.forzen,
		Snacks: productsPathes.snacks,
	};

	useEffect(() => {
		getProductsInDiscount()
			.then((res) => {
				setProductsInDiscount(res);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <Loader />;
	}

	return (
		<main className='gradient min-vh-100'>
			<div className='container rounded rounded-3'>
				<h1 className='w-100 text-center mb-4 p-2 rounded display-5 fw-bold'>
					הצעות ומבצעים
				</h1>
				<p className='text-center mb-4 p-2 rounded lead'>
					<span className='text-center mb-4 p-2 rounded d-block'>
						אל תפספסו את המבצעים המיוחדים שלנו!
					</span>
					אנחנו תמיד מציעים הנחות והטבות על פירות וירקות בעונות מסוימות, וגם
					חבילות משתלמות למשפחות. עקבו אחרי הדף שלנו כדי לדעת את כל המבצעים
					העדכניים ולחסוך עוד יותר!
				</p>
			</div>
			<div className='row m-auto'>
				{productsInDiscount.map((product) => {
					// Look up the category path from the map
					const categoryPath = categoryToPath[product.category] || "";

					return (
						<div
							className='col-md-4 col-lg-3 col-sm-10 m-auto'
							key={product._id}
						>
							<div className='card mb-3'>
								<div className='card-img-top object-fit-cover overflow-hidden'>
									<Link to={categoryPath}>
										<img
											style={{
												height: "150px",
												width: "100%",
											}}
											className='img-thumbnail rounded-3'
											src={product.image_url}
											alt={product.product_name}
										/>
									</Link>
								</div>
								<div className='card-body'>
									<h5 className='card-title text-center'>
										{product.product_name}
									</h5>
									<hr />
									<h5 className='text-danger text-center'>
										{product.sale
											? `במבצע ${product.discount}%`
											: "הצעות בשבילך"}
									</h5>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</main>
	);
};

export default DiscountsAndOffers;
