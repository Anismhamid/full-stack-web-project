import {FunctionComponent} from "react";
import ProductCategory from "./ProductsCategory";

interface BeveragesProps {}

const Beverages: FunctionComponent<BeveragesProps> = () => {
	return (
		<main className=' min-vh-100'>
			<div className='container'>
				<h1 className='text-center mb-4 p-2 rounded display-6 fw-bold'>
					המשקאות שלנו - טריים, איכותיים ומגוונים!
				</h1>
				<hr />
				<p className='text-center mb-4 p-2 rounded lead'>
					כאן תוכלו למצוא מגוון רחב של משקאות טריים, טבעיים ומיוחדים שמתאימים
					לכל טעם. אנו מבטיחים איכות גבוהה ומשקאות טעימים שיספקו לכם חווית שתייה
					מושלמת
				</p>
			</div>
			<ProductCategory category='beverages' />
		</main>
	);
};

export default Beverages;
