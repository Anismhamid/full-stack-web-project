import {FunctionComponent} from "react";
import ProductCategory from "./ProductsCategory";

interface FrozenProps {}
/**
 * Mains frozen
 * @returns frozen products
 */
const Frozen: FunctionComponent<FrozenProps> = () => {
	return (
		<main className=' min-vh-100'>
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
