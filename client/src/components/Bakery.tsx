import {FunctionComponent} from "react";
import ProductCategory from "./ProductsCategory";

interface BakeryProps {}

const Bakery: FunctionComponent<BakeryProps> = () => {
	return (
		<main className=' min-vh-100'>
			<div className='container'>
				<h1 className='text-center mb-4 rounded display-6 fw-bold'>
					מוצרי המאפה שלנו - טריים, איכותיים ומגוונים!
				</h1>
				<hr />
				<p className='text-center mb-4 p-2 rounded lead'>
					כאן תוכלו למצוא מגוון רחב של מוצרי מאפה טריים, שנאפו במקום עם חומרי
					גלם איכותיים. אנו מבטיחים טעמים נהדרים ומוצרים טריים שיספקו לכם חווית
					טעמים מושלמת.
				</p>
			</div>
			<ProductCategory category='bakery' />
		</main>
	);
};

export default Bakery;
