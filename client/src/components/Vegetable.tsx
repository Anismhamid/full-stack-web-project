import {FunctionComponent} from "react";
import ProductCategory from "./ProductsCategory";

interface VegentableProps {}

const Vegentable: FunctionComponent<VegentableProps> = () => {
	return (
		<main className=' min-vh-100'>
			<div className='container m-auto'>
				<h1 className='text-center mb-4 p-2 rounded display-6 fw-bold'>
					הירקות שלנו - טריים ובריאים לכל משפחה!
				</h1>
				<hr />
				<p className='text-center mb-4 p-2 rounded lead'>
					הירקות שלנו גדלים בשדות פוריים ואיכותיים, עם דגש על טריות ובריאות.
					אנחנו מביאים לכם את הירקות הטריים ביותר, שישדרגו כל ארוחה ויעניקו לכם
					את הטוב ביותר. תמצאו כאן ירקות בעונה, במיוחד עבורכם
				</p>
			</div>
			<ProductCategory category='vegetable' />
		</main>
	);
};

export default Vegentable;
