import {FunctionComponent} from "react";

interface PrivacyAdnPolicyProps {}

const PrivacyAdnPolicy: FunctionComponent<PrivacyAdnPolicyProps> = () => {
	return (
		<main className='min-vh-100 bg-light py-5 px-3'>
			<div className='container bg-white shadow p-5 rounded-4'>
				<h1 className='text-center mb-4 text-primary'>מדיניות פרטיות</h1>
				<p className='text-muted text-center mb-5'>
					עודכן לאחרונה: <strong>13/04/2025</strong>
				</p>

				<section className='mb-4'>
					<h2 className='h5 text-dark'>1. מבוא</h2>
					<p>
						ביישום שלנו <strong>שוק בפינה</strong> אנחנו שומרים על פרטיותך
						ומבינים את החשיבות שבשמירה על המידע האישי שלך. מדיניות זו מסבירה
						כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך, כולל בעת
						התחברות עם גוגל.
					</p>
				</section>

				<section className='mb-4'>
					<h2 className='h5 text-dark'>2. איזה מידע אנו אוספים?</h2>
					<p>
						בעת התחברות באמצעות Google, אנו מקבלים את המידע הבא מחשבון הגוגל
						שלך:
					</p>
					<ul>
						<li>
							<strong>שם פרטי ושם משפחה</strong> – כפי שמוגדרים בפרופיל
							הגוגל שלך.
						</li>
						<li>
							<strong>דוא"ל</strong> – כתובת המייל שלך המשמשת להזדהות
							באפליקציה.
						</li>
						<li>
							<strong>תמונת פרופיל</strong> – אם קיימת, תוצג בפרופיל שלך
							באפליקציה.
						</li>
					</ul>
					<p className='mt-2'>
						בנוסף, אנו עשויים לשמור מידע טכני כגון כתובת IP, סוג דפדפן ומערכת
						הפעלה, לצרכי אבטחה ושיפור השירות.
					</p>
				</section>

				<section className='mb-4'>
					<h2 className='h5 text-dark'>3. כיצד אנו משתמשים במידע?</h2>
					<ul>
						<li>לביצוע רישום ואימות זהות המשתמש.</li>
						<li>לשיפור חוויית המשתמש באפליקציה.</li>
						<li>לשליחת הודעות, עדכונים או תזכורות רלוונטיות.</li>
						<li>לשמירה על אבטחת המערכת והגנה על חשבונך.</li>
					</ul>
				</section>

				<section className='mb-4'>
					<h2 className='h5 text-dark'>4. שקיפות והסכמה</h2>
					<p>
						בעת התחברות דרך גוגל, תתבקש לאשר גישה למידע שלך. אנו מבקשים רק את
						ההרשאות ההכרחיות לתפקוד תקין של השירות, תוך שמירה על שקיפות מלאה.
					</p>
				</section>

				<section className='mb-4'>
					<h2 className='h5 text-dark'>5. שיתוף מידע עם צדדים שלישיים</h2>
					<ul>
						<li>
							<strong>שירותים חיצוניים:</strong> מידע יועבר אך ורק לספקים
							הנדרשים לתפעול האפליקציה.
						</li>
						<li>
							<strong>ציות לחוק:</strong> נשתף מידע רק אם נידרש לכך על פי
							חוק.
						</li>
					</ul>
				</section>

				<section className='mb-4'>
					<h2 className='h5 text-dark'>6. הגנה על המידע</h2>
					<p>
						אנו נוקטים באמצעים טכנולוגיים וארגוניים מתקדמים לשמירה על המידע
						שלך. יחד עם זאת, אין אבטחה מוחלטת, ולכן אנו ממליצים להימנע משיתוף
						סיסמאות ולבחור בסיסמה חזקה.
					</p>
				</section>

				<section className='mb-4'>
					<h2 className='h5 text-dark'>7. עדכונים למדיניות</h2>
					<p>
						ייתכנו שינויים במדיניות מעת לעת. נודיע על כך בתוך האפליקציה או
						באמצעות הודעה ישירה. שימוש מתמשך באפליקציה מהווה הסכמה לעדכונים.
					</p>
				</section>

				<section className='mb-4'>
					<h2 className='h5 text-dark'>8. הזכויות שלך</h2>
					<ul>
						<li>זכות לעיין במידע האישי השמור עליך.</li>
						<li>זכות לתקן מידע שגוי או חסר.</li>
						<li>זכות לבקש מחיקת מידע – כל עוד אין חובה חוקית לשמור אותו.</li>
					</ul>
				</section>

				<section className='mb-5'>
					<h2 className='h5 text-dark'>9. יצירת קשר</h2>
					<p>
						בכל שאלה, בירור או בקשה הנוגעת לפרטיות, ניתן ליצור קשר בטלפון:{" "}
						<strong>053-834-6915</strong>
					</p>
				</section>

				<section>
					<h2 className='h5 text-dark'>10. הסכמת המשתמש</h2>
					<p>
						השימוש באפליקציה מהווה אישור לכך שקראת, הבנת והסכמת למדיניות
						פרטיות זו. אם אינך מסכים – אנא הימנע מהשימוש.
					</p>
				</section>
			</div>
		</main>
	);
};

export default PrivacyAdnPolicy;
