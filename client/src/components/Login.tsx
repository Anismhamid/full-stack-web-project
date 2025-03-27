import {useFormik} from "formik";
import {FunctionComponent, useState} from "react";
import {UserLogin} from "../interfaces/User";
import * as yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import {path} from "../routes/routes";
import {loginUser} from "../services/usersServices";
import {useUser} from "../hooks/useUSer";
import useToken from "../hooks/useToken";
import {showSuccess} from "../atoms/Toast";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
	// const dispatch = useDispatch<Dispatch<UserAction>>();
	const {setAuth, setIsLoggedIn} = useUser();
	const {decodedToken} = useToken();
	const navigate = useNavigate();
	const [isLoadin, setLoading] = useState<boolean>(false);

	const formik = useFormik<UserLogin>({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yup.object({
			email: yup.string().required("נדרש אימייל").email("אימייל לא חוקי"),
			password: yup
				.string()
				.required("נדרשת סיסמה")
				.min(8, "הסיסמה חייבת לכלול לפחות 8 תווים עד 60 תווים")
				.max(60, "הסיסמה ארוכה מדי"),
		}),
		onSubmit(values) {
			if (decodedToken) {
				setLoading(true);
				loginUser(values).then((token) => {
					setLoading(false);
					localStorage.setItem("token", token);
					setAuth(decodedToken);
					setIsLoggedIn(true);
					navigate(path.Home);
					showSuccess(`ברוך שובך`);
				});
			}
		},
	});

	if (isLoadin) {
		return (
			<main className='login min-vh-100'>
				<div className='loader'></div>
			</main>
		);
	}

	return (
		<main className='login min-vh-100'>
			<div className='container'>
				<form
					autoComplete='off'
					noValidate
					onSubmit={formik.handleSubmit}
					className=''
				>
					<h1 className='display-1 my-5 text-light fw-bold text-center'>
						התחבר
					</h1>
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
