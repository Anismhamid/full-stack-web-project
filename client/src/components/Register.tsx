import {useFormik} from "formik";
import {FunctionComponent} from "react";
import * as yup from "yup";
import {UserRegister} from "../interfaces/User";
import {Link, useNavigate} from "react-router-dom";
import {path} from "../routes/routes";
import {registerNewUser} from "../services/usersServices";
import {showSuccess} from "../atoms/Toast";

interface RegisterProps {}

const Register: FunctionComponent<RegisterProps> = () => {
	const navigate = useNavigate();
	const formik = useFormik<UserRegister>({
		initialValues: {
			name: {
				first: "",
				last: "",
				username: "",
			},
			email: "",
			password: "",
			image: {
				url: "",
				alt: "",
			},
			isAdmin: false,
			isModerator: false,
		},
		validationSchema: yup.object({
			name: yup.object({
				first: yup.string().min(2).required("נדרש שם פרטי"),
				last: yup.string().required("נדרש שם משפחה"),
				username: yup.string().optional(),
			}),
			email: yup.string().required("נדרש אימייל").email("אימייל לא חוקי"),
			password: yup
				.string()
				.required("נדרשת סיסמה")
				.min(8, "הסיסמה חייבת לכלול לפחות 8 תווים עד 60 תווים")
				.max(60, "הסיסמה ארוכה מדי"),
			role: yup.string().default("Client"),
			image: yup
				.object({
					url: yup.string().url("פורמט כתובת אתר לא חוקי").optional(),
					alt: yup.string().optional(),
				})
				.optional(),
		}),
		onSubmit(values) {
			console.log(values);
			registerNewUser(values);
			showSuccess("נחמד, נרשמת בהצלחה!. עכשיו אתה יכול להתחבר");
			navigate(path.Login);
		},
	});

	return (
		<main className='login min-vh-100'>
			<div className='container pt-5 mt-5'>
				<form autoComplete='off' noValidate onSubmit={formik.handleSubmit}>
					<h1 className='display-1 text-light fw-bold ms-5 mt-2'>הרשמה</h1>
					<div className='form-floating my-3'>
						<input
							type='text'
							name='name.first'
							value={formik.values.name.first}
							onChange={formik.handleChange}
							className='form-control'
							id='firstName'
							placeholder=''
						/>
						<label htmlFor='firstName'>
							שם פרטי <span className=' text-danger fw-bold'>*</span>
						</label>
						{formik.errors.name?.first && formik.touched.name?.first && (
							<div className='text-danger'>{formik.errors.name?.first}</div>
						)}
					</div>

					<div className='form-floating mb-3'>
						<input
							type='text'
							name='name.last'
							value={formik.values.name.last}
							onChange={formik.handleChange}
							className='form-control'
							id='lastName'
							placeholder=''
						/>
						<label htmlFor='lastName'>
							שם משפחה <span className=' text-danger fw-bold'>*</span>
						</label>
						{formik.errors.name?.last && formik.touched.name?.last && (
							<div className='text-danger'>{formik.errors.name.last}</div>
						)}
					</div>

					<h6 className='text-primary mb-2'>(אופציונלי)</h6>
					<div className='form-floating mb-3'>
						<input
							type='text'
							name='name.username'
							value={formik.values.name.username}
							onChange={formik.handleChange}
							className='form-control'
							id='username'
							placeholder=''
						/>
						<label htmlFor='username'>שם משתמש (אופציונלי)</label>
					</div>
					<hr className='text-light' />
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
							<div className='text-danger'>{formik.errors.password}</div>
						)}
					</div>
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

					<button type='submit' className='btn btn-success w-100'>
						הרשמה
					</button>
					<div className='mt-3'>
						<span className='text-light fw-bold me-1'>יש לך חשבון ?</span>
						<Link to={path.Register}>לחץ כאן להתחבר</Link>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Register;
