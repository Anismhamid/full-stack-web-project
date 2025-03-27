import {FunctionComponent} from "react";
import Fruits from "./Fruits";
import Vegentable from "./Vegetable";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
	return (
		<main>
			<div className='container'>
				<hr />
				<section className='my-5'>
					<Fruits />
				</section>

				<section className='my-5'>
					<Vegentable />
				</section>

				<section className='my-5'>
					<h2 className='text-center mb-4'>הצעות ומבצעים</h2>
					<p className='text-center mb-4'>
						אל תפספסו את המבצעים המיוחדים שלנו! אנחנו תמיד מציעים הנחות והטבות
						על פירות וירקות בעונות מסוימות, וגם חבילות משתלמות למשפחות. עקבו
						אחרי הדף שלנו כדי לדעת את כל המבצעים העדכניים ולחסוך עוד יותר!
					</p>
				</section>

				<section className='my-5'>
					<h2 className='text-center mb-4'>אנו כאן לשירותכם!</h2>
					<p className='text-center mb-4'>
						אם יש לכם שאלות על המוצרים, המבצעים, או איך לבצע הזמנה, אל תהססו
						לפנות אלינו! צוות שירות הלקוחות שלנו זמין 24/7 כדי לעזור לכם.
						אנחנו כאן כדי להבטיח שתהנו מכל רכישה ושזה יהיה תהליך חלק ונעים
						עבורכם.
					</p>
				</section>
			</div>
		</main>
	);
};

export default Home;
