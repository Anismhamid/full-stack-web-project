import {useFormik} from "formik";
import {FunctionComponent, useEffect} from "react";
import {UserLogin} from "../interfaces/User";
import * as yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {path} from "../routes/routes";
import {loginUser} from "../services/usersServices";
import {useUser} from "../context/useUSer";
import useToken from "../hooks/useToken";
import {showSuccess} from "../atoms/Toast";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	const {setAuth, setIsLoggedIn} = useUser();
	const navigate = useNavigate();
	const {decodedToken, setAfterDecode} = useToken();

	const formik = useFormik<UserLogin>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup.string().email("אימייל לא חוקי").required("נדרש אימייל"),
			password: yup
				.string()
				.min(8, "הסיסמה חייבת לכלול לפחות 8 תווים עד 60 תווים")
				.max(60, "הסיסמה ארוכה מדי")
				.required("נדרשת סיסמה"),
		}),
		onSubmit: async (values, {resetForm}) => {
			try {
				const token = await loginUser(values); // Assume token is returned from login
				if (token) {
					// Save token to localStorage
					localStorage.setItem("token", token);

					setAfterDecode(token);
					setAuth(decodedToken);
					setIsLoggedIn(true);

					showSuccess("התחברת בהצלחה!");

					navigate(path.Home);
				}
			} catch (error) {
				setAuth(null);
				setIsLoggedIn(false);
				resetForm();
			}
		},
	});

	useEffect(() => {
		if (localStorage.token) {
			navigate(path.Home);
		}
	}, []);

	return (
		<main className='login min-vh-100'>
			<div className='container'>
				<form autoComplete='off' noValidate onSubmit={formik.handleSubmit}>
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
						<label id='email' htmlFor='email'>
							דו"אל *
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
						<label id='password' htmlFor='password'>
							סיסמה *
						</label>
						{formik.errors.password && formik.touched.password && (
							<div className='text-danger fw-bold'>
								{formik.errors.password}
							</div>
						)}
					</div>

					<button type='submit' className='btn btn-success w-100'>
						התחברות
					</button>
					<div className='mt-3'>
						<span className='text-light fw-bold me-1'>
							עדיין אין לך חשבון ?
						</span>
						<Link to={path.Register}>לחץ כאן להרשמה</Link>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Login;
