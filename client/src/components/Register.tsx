import {useFormik} from "formik";
import {FunctionComponent} from "react";
import * as yup from "yup";
import {UserRegister} from "../interfaces/User";
import {Link, useNavigate} from "react-router-dom";
import {path} from "../routes/routes";
import {registerNewUser} from "../services/usersServices";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
	const navigate = useNavigate();
	const formik = useFormik<UserRegister>({
		initialValues: {
			name: {
				first: "",
				last: "",
			},
			phone: {
				phone_1: "",
				phone_2: "",
			},
			address: {
				city: "",
				street: "",
				houseNumber: "",
			},
			email: "",
			password: "",
			image: {
				url: "",
				alt: "",
			},
			role: "Client",
		},
		validationSchema: yup.object({
			name: yup.object({
				first: yup
					.string()
					.required("נדרש שם פרטי")
					.min(2, "שם פרטי חייב לכלול לפחות 2 תווים"),
				last: yup
					.string()
					.required("נדרש שם משפחה")
					.min(2, "שם משפחה חייב לכלול לפחות 2 תווים"),
			}),
			phone: yup.object({
				phone_1: yup
					.string()
					.min(9, "מספר הטלפון חייב להיות בן 9 תווים לפחות")
					.max(10, "מספר הטלפון חייב להיות באורך 10 תווים לכל היותר")
					.required('נדרש מ"ס טלפון'),
				phone_2: yup.string(),
			}),
			address: yup.object({
				city: yup
					.string()
					.min(2, "עיר חייבת להיות באורך 2 תווים לפחות")
					.required("נדרש שם עיר"),
				street: yup.string().required("נדרש שם רחוב"),
				houseNumber: yup.string().optional(),
			}),
			email: yup
				.string()
				.min(5, 'הדוא"ל חייב להיות באורך 5 תווים לפחות')
				.email("אימייל לא חוקי")
				.required("נדרש אימייל"),
			password: yup
				.string()
				.required("נדרשת סיסמה")
				.min(8, "הסיסמה חייבת לכלול לפחות 8 תווים עד 60 תווים")
				.max(60, "הסיסמה ארוכה מדי"),
			role: yup.string().default("Client"),
			image: yup.object({
				url: yup.string().url("פורמט כתובת אתר לא חוקי").optional(),
				alt: yup.string().optional(),
			}),
		}),
		onSubmit: async (values) => {
			try {
				await registerNewUser(values);
				navigate(path.Login);
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<main className='login min-vh-100'>
			<div className='container pt-5 mt-5'>
				<form autoComplete='off' noValidate onSubmit={formik.handleSubmit}>
					<h6 className='display-6 text-light text-center'>הרשמה</h6>

					{/* first - last name  */}
					<div className='row'>
						<div className='col-md-6'>
							<div className='form-floating mb-3'>
								<input
									aria-label='first name'
									type='text'
									name='name.first'
									value={formik.values.name.first}
									onChange={formik.handleChange}
									className='form-control'
									id='name.first'
									placeholder=''
								/>
								<label htmlFor='name.first'>
									שם פרטי
									<span className='text-danger fw-bold ms-1'>*</span>
								</label>
								{formik.errors.name?.first &&
									formik.touched.name?.first && (
										<div className='text-danger'>
											{formik.errors.name?.first}
										</div>
									)}
							</div>
						</div>
						<div className='col-md-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									name='name.last'
									value={formik.values.name.last}
									onChange={formik.handleChange}
									className='form-control'
									id='name.last'
									placeholder=''
								/>
								<label htmlFor='name.last'>
									שם משפחה
									<span className='text-danger fw-bold ms-1'>*</span>
								</label>
								{formik.errors.name?.last &&
									formik.touched.name?.last && (
										<div className='text-danger'>
											{formik.errors.name.last}
										</div>
									)}
							</div>
						</div>
					</div>

					{/* phone 1 - 2  */}
					<hr className='text-light' />
					<div className='row'>
						<div className='col-md-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									name='phone.phone_1'
									value={formik.values.phone.phone_1}
									onChange={formik.handleChange}
									className='form-control'
									id='phone.phone_1'
									placeholder='phone.phone_1'
								/>
								<label htmlFor='מ"ס טלופן '>
									מ"ס טלופן{" "}
									<span className=' text-danger fw-bold'>*</span>
								</label>
								{formik.touched.phone?.phone_1 &&
									formik.errors.phone?.phone_1 && (
										<div className='text-danger fw-bold'>
											{formik.errors.phone.phone_1}
										</div>
									)}
							</div>
						</div>
						<div className='col-md-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									name='phone.phone_2'
									value={formik.values.phone.phone_2}
									onChange={formik.handleChange}
									className='form-control'
									id='phone.phone_2'
									placeholder=''
								/>
								<label htmlFor='phone.phone_2'>
									מ"ס טלפון שני (אופציונלי)
								</label>
							</div>
						</div>
					</div>

					{/* email password */}
					<hr className='text-light' />
					<div className='row'>
						<div className='col-md-6'>
							<div className='form-floating mb-3'>
								<input
									type='email'
									name='email'
									value={formik.values.email}
									onChange={formik.handleChange}
									className='form-control'
									id='email'
									placeholder=''
								/>
								<label htmlFor='email'>
									דו"אל <span className='text-danger fw-bold'>*</span>
								</label>
								{formik.touched.email && formik.errors.email && (
									<div className='text-danger fw-bold'>
										{formik.errors.email}
									</div>
								)}
							</div>
						</div>

						<div className='col-md-6'>
							<div className='form-floating mb-3'>
								<input
									type='password'
									name='password'
									value={formik.values.password}
									onChange={formik.handleChange}
									className='form-control'
									id='password'
									placeholder=''
								/>
								<label htmlFor='password'>
									סיסמה <span className=' text-danger fw-bold'>*</span>
								</label>
								{formik.errors.password && formik.touched.password && (
									<div className='text-danger'>
										{formik.errors.password}
									</div>
								)}
							</div>
						</div>
					</div>

					{/* image - alt */}
					<hr className=' text-light' />

					<h6 className='text-primary mb-2 text-center'>(אופציונלי)</h6>
					<div className='row'>
						<div className='col-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									name='image.url'
									value={formik.values.image?.url}
									onChange={formik.handleChange}
									className='form-control'
									id='imageUrl'
									placeholder=''
								/>
								<label htmlFor='imageUrl'>קישור לתמונה</label>
							</div>
						</div>
						<div className='col-6'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									name='image.alt'
									value={formik.values.image?.alt}
									onChange={formik.handleChange}
									className='form-control'
									id='imageAlt'
									placeholder=''
								/>
								<label htmlFor='imageAlt'>שם התמונה</label>
							</div>
						</div>
					</div>

					{/* address city - street - house number  */}
					<hr className='text-light' />
					<div className='row'>
						<div className='col-md-4'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									name='address.city'
									value={formik.values.address.city}
									onChange={formik.handleChange}
									className='form-control'
									id='address.city'
									placeholder=''
								/>
								<label htmlFor='address.city'>
									עיר
									<span className=' text-danger fw-bold ms-1'>*</span>
								</label>
								{formik.touched.address?.city &&
									formik.errors.address?.city && (
										<div className='text-danger fw-bold'>
											{formik.errors.address.city}
										</div>
									)}
							</div>
						</div>

						<div className='col-md-4'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									name='address.street'
									value={formik.values.address.street}
									onChange={formik.handleChange}
									className='form-control'
									id='address.street'
									placeholder=''
								/>
								<label htmlFor='address.street'>
									שם רחוב
									<span className=' text-danger fw-bold ms-1'>*</span>
								</label>
								{formik.touched.address?.street &&
									formik.errors.address?.street && (
										<div className='text-danger fw-bold'>
											{formik.errors.address.street}
										</div>
									)}
							</div>
						</div>
						<div className='col-md-4'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									name='address.houseNumber'
									value={formik.values.address.houseNumber}
									onChange={formik.handleChange}
									className='form-control'
									id='address.houseNumber'
									placeholder=''
								/>
								<label htmlFor='address.houseNumber'>מ"ס בית</label>
							</div>
						</div>
					</div>
					<button type='submit' className='btn btn-success w-100'>
						הרשמה
					</button>
					<div className='mt-3'>
						<span className='text-light fw-bold me-1'>יש לך חשבון ?</span>
						<Link to={path.Login}>לחץ כאן להתחבר</Link>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Register;
