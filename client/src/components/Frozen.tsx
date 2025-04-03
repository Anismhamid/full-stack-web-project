import {FunctionComponent} from "react";
// import {getFrozenProducts} from "../services/productsServices"; // updated to fetch frozen products
// import {Products} from "../interfaces/Products";
// import {handleAddToCart, handleQuantity} from "../helpers/fruitesFunctions";
// import ForAllModal from "../atoms/LoginModal";
// import {useUser} from "../context/useUSer";
// import DeleteProductButton from "../atoms/DeleteProductButton";
// import Loader from "../atoms/loader/Loader";
import ProductCategory from "./ProductsCategory";
// import { productsPathes } from "../routes/routes";

interface FrozenProps {}

const Frozen: FunctionComponent<FrozenProps> = () => {
	return (
		<main className='gradient min-vh-100'>
			<div className='container'>
				<h1 className='text-center mb-4 p-2 rounded display-6 fw-bold'>
					המוצרים הקפואים שלנו - איכות גבוהה, טריים ומגוונים!
				</h1>
				<hr />
				<p className='text-center mb-4 p-2 rounded lead'>
					כאן תוכלו למצוא מגוון רחב של מוצרים קפואים, שמיוצרים מחומרים טבעיים
					ונשמרים בטכנולוגיות חדישות לשמירה על טריותם. אנו מבטיחים איכות גבוהה
					ושירות מצוין כדי שתהנו מכל מוצר קפוא בנוחות ובקלות.
				</p>
			</div>
			<ProductCategory category='forzen' />
		</main>
	);
};

export default Frozen;
