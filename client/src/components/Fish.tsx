import {FunctionComponent} from "react";

import ProductCategory from "./ProductsCategory";

interface FishProps {}
/**
 * Mains fish
 * @returns fishs products
 */
const Fish: FunctionComponent<FishProps> = () => {
	return (
		<main className=' min-vh-100'>
			<div className='container'>
				<h1 className='text-center mb-4 p-2 rounded display-6 fw-bold'>
					הדגים שלנו - טריים, איכותיים ומגוונים!
				</h1>
				<hr />
				<p className='text-center mb-4 p-2 rounded lead'>
					כאן תוכלו למצוא מגוון רחב של דגים טריים, שנקטפו ממש עכשיו מהדייגים
					המקומיים שלנו. אנו מבטיחים איכות גבוהה ושירות מצוין כדי שתהנו מכל דג
					בקלות ובנוחות. יש לנו דגים בכל הצבעים והטעמים, כך שכל אחד יכול למצוא
					את המועדף עליו.
				</p>
			</div>

			<ProductCategory category='fish' />
		</main>
	);
};

export default Fish;
