import {FunctionComponent} from "react";
import ProductCategory from "./ProductsCategory";

interface FruitsProps {}

const Fruits: FunctionComponent<FruitsProps> = () => {
	return (
		<main className='gradient min-vh-100'>
			<div className='container'>
				<h1 className='text-center mb-4 p-2 rounded display-6 fw-bold'>
					הפירות שלנו - טריים, איכותיים ומגוונים!
				</h1>
				<hr />
				<p className='text-center mb-4 p-2 rounded lead'>
					כאן תוכלו למצוא מגוון רחב של פירות טריים, שנקטפו ממש עכשיו מהחקלאים
					המקומיים שלנו. אנו מבטיחים איכות גבוהה ושירות מצוין כדי שתהנו מכל פרי
					בקלות ובנוחות. יש לנו פירות בכל הצבעים והטעמים, כך שכל אחד יכול למצוא
					את המועדף עליו
				</p>
			</div>
			<ProductCategory category='fruit' />
		</main>
	);
};

export default Fruits;
