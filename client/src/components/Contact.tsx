import {FunctionComponent} from "react";
import {Link} from "react-router-dom";

interface ContactProps {}

const Contact: FunctionComponent<ContactProps> = () => {
	return (
		<div className='container py-5'>
			<h1 className='text-center display-1'>צור קשר</h1>
			<hr />
			<div className='row justify-content-center'>
				<div className='col-md-8'>
					<h3 className='mb-3'>שוק הבינה - פירות וירקות אורגניים</h3>
					<p className='lead'>
						אנו ב"שוק הבינה" גאים להציע פירות וירקות טריים ואורגניים שנשלחים
						ישירות אליכם עד דלת הבית, עם דגש על איכות ושירות ברמה גבוהה.
					</p>
					<p>
						המטרה שלנו היא לספק ללקוחותינו את הפירות והירקות הבריאים ביותר,
						תוך שמירה על עקרונות החקלאות האורגנית וחקלאות בת-קיימא. הצטרפו
						אלינו לאורח חיים בריא וטעים.
					</p>

					<hr />

					<h4>צור קשר עם צוות "שוק הבינה"</h4>
					<p>
						יש לנו צוות מיומן ומסור שמוכן תמיד לסייע ולענות על כל שאלה. בין אם
						אתם רוצים לברר מידע על המוצרים שלנו, לבצע הזמנה או לשוחח על נושא
						אחר – אנחנו כאן עבורכם.
					</p>

					<h5 className='mt-4'>פרטי קשר:</h5>
					<ul>
						<li>
							<strong>דוא"ל:</strong>{" "}
							<Link
								to='mailto:support@fruitsandveg.com'
								className='text-primary ms-1 text-decoration-none'
							>
								support@fruitsandveg.com
							</Link>
						</li>
						<li>
							<strong>טלפון:</strong>{" "}
							<Link
								to='tel:+97231234567'
								className='text-primary text-decoration-none ms-1'
							>
								03-1234567
							</Link>
						</li>
					</ul>

					<p className='mt-5'>
						אנחנו תמיד שמחים לקבל פניות מלקוחותינו, והצוות שלנו עובד קשה כדי
						להבטיח שאתם מקבלים את השירות הטוב ביותר. אל תהססו לפנות אלינו בכל
						שאלה או בקשה.
					</p>

					<hr />

					<h5 className='mt-4'>כתובת</h5>
					<p>
						אם אתם מעוניינים לבקר אותנו פיזית, אנו ממוקמים בכתובת:
						<strong> שדרות ירושלים 45, תל אביב</strong>
					</p>

					<p className='mt-4'>
						תודה על שבחרתם בנו, ונשמח לעזור לכם ליהנות ממזון איכותי ובריא!
					</p>
				</div>
			</div>
		</div>
	);
};

export default Contact;
