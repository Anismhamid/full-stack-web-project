import {FunctionComponent} from "react";
import ProductCategory from "./ProductsCategory";

interface SpicesProps {}
/**
 * Mains spices
 * @returns spices products
 */
const Spices: FunctionComponent<SpicesProps> = () => {
	return (
		
		<main className=' min-vh-100'>
			<div className='container'>
				<h1 className='text-center mb-4 p-2 rounded display-6 fw-bold'>
					התבלינים שלנו - טבעיים, איכותיים ומגוונים!
				</h1>
				<hr />
				<p className='text-center mb-4 p-2 rounded lead'>
					כאן תוכלו למצוא מגוון רחב של תבלינים טבעיים, שנבחרו בקפידה מהספקים
					המקומיים שלנו. אנו מבטיחים איכות גבוהה ושירות מצוין כדי שתהנו מכל
					תבלין בנוחות ובקלות.
				</p>
			</div>
			<ProductCategory category='spices' />
		</main>
	);
};

export default Spices;
