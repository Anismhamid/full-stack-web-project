import {FunctionComponent, useEffect, useState} from "react";
import ProductCategory from "./ProductsCategory";
// import {getMeatProducts} from "../services/productsServices"; // changed to fetch meat products
// import {Products} from "../interfaces/Products";
// import {handleAddToCart, handleQuantity} from "../helpers/fruitesFunctions";
// import ForAllModal from "../atoms/LoginModal";
// import {useUser} from "../context/useUSer";
// import DeleteProductButton from "../atoms/DeleteProductButton";
// import Loader from "../atoms/loader/Loader";

interface MeatProps {}

const Meat: FunctionComponent<MeatProps> = () => {
	// const [meat, setMeat] = useState<Products[]>([]); // changed to meat
	// const [quantities, setQuantities] = useState<{[key: string]: number}>({});
	// const [onShowModal, setOnShowModal] = useState<boolean>(false);
	// const [loading, setLoading] = useState<boolean>(true);
	// const {auth, isLoggedIn} = useUser();

	// const OnShowCartModal = () => setOnShowModal(true);
	// const OnHideCartModal = () => setOnShowModal(false);

	// const handleAdd = (
	// 	product_name: string,
	// 	quantity: {[key: string]: number},
	// 	price: number,
	// 	product_image: string,
	// 	sale: boolean,
	// 	discount: number,
	// ) => {
	// 	const productQuantity = quantity[product_name];
	// 	if (!isLoggedIn) {
	// 		OnShowCartModal();
	// 	} else {
	// 		handleAddToCart(
	// 			setQuantities,
	// 			product_name,
	// 			productQuantity,
	// 			price - (price * discount) / 100,
	// 			product_image,
	// 			sale,
	// 			discount,
	// 		);
	// 	}
	// };

	// useEffect(() => {
	// 	getMeatProducts()
	// 		.then((res) => {
	// 			setMeat(res);
	// 			const initialQuantities = res.reduce(
	// 				(acc: any, meat: {product_name: string}) => {
	// 					acc[meat.product_name] = 1;
	// 					return acc;
	// 				},
	// 				{},
	// 			);
	// 			setQuantities(initialQuantities);
	// 			setLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		})
	// 		.finally(() => setLoading(false));
	// }, []);

	// if (loading) {
	// 	return <Loader />;
	// }

	return (
		<main className='gradient min-vh-100'>
			<div className='container'>
				<h1 className='text-center mb-4 p-2 rounded display-6 fw-bold'>
					הבשרים שלנו - טריים, איכותיים ומגוונים!
				</h1>
				<hr />
				<p className='text-center mb-4 p-2 rounded lead'>
					כאן תוכלו למצוא מגוון רחב של בשרים טריים, שנבחרו בקפידה מהספקים
					המקומיים שלנו. אנו מבטיחים איכות גבוהה ושירות מצוין כדי שתהנו מכל נתח
					בשר בנוחות ובקלות.
				</p>
			</div>
			<ProductCategory category='meat' />
		</main>
	);
};

export default Meat;
