import {FunctionComponent} from "react";
import ProductCategory from "./ProductsCategory";

interface MeatProps {}

const Meat: FunctionComponent<MeatProps> = () => {


	return (
		<main className=' min-vh-100'>
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
