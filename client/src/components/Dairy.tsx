import {FunctionComponent} from "react";
import ProductCategory from "./ProductsCategory";

interface DairyProps {}

const Dairy: FunctionComponent<DairyProps> = () => {
	return (
		<main className='gradient min-vh-100'>
			<div className='container'>
				<h1 className='text-center mb-4  p-2 rounded display-6 fw-bold'>
					מוצרי החלב שלנו - טריים, איכותיים ומגוונים!
				</h1>
				<hr />
				<p className='text-center mb-4 p-2 rounded lead'>
					כאן תוכלו למצוא מגוון רחב של מוצרי חלב טבעיים ואיכותיים, שנבחרו בקפידה
					מהספקים המקומיים שלנו. אנו מבטיחים איכות גבוהה ושירות מצוין כדי שתהנו
					מכל מוצר חלב בנוחות ובקלות.
				</p>
			</div>
			<ProductCategory category='dairy' />
		</main>
	);
};

export default Dairy;
