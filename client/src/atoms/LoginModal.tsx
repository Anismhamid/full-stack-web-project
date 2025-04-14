import {FunctionComponent} from "react";
import {Modal} from "react-bootstrap";
import {useFormik} from "formik";
import {UserLogin} from "../interfaces/User";
import * as yup from "yup";
import {Link} from "react-router-dom";
import {path} from "../routes/routes";
import {loginUser} from "../services/usersServices";
import {useUser} from "../context/useUSer";
import useToken from "../hooks/useToken";
import {showSuccess} from "./Toast";
import {emptyAuthValues} from "../interfaces/authValues";
interface ForAllModalProps {
	show: boolean;
	onHide: Function;
}

const ForAllModal: FunctionComponent<ForAllModalProps> = ({onHide, show}) => {
	const {setAuth, setIsLoggedIn} = useUser();
	const {decodedToken, setAfterDecode} = useToken();

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
					onHide();
				}
			} catch (error) {
				setAuth(emptyAuthValues);
				setIsLoggedIn(false);
				resetForm();
			}
		},
	});

	return (
		<Modal className='' show={show} onHide={() => onHide()} centered>
			<Modal.Body className='d-flex justify-content-center align-items-center'>
				<div className='container border rounded'>
					<form
						autoComplete='off'
						noValidate
						onSubmit={formik.handleSubmit}
						className=''
					>
						<h2 className='display-6 my-5 fw-bold text-center'>
							התחברות
						</h2>
						<div className='form-floating my-3'>
							<input
								type='email'
								name='email'
								value={formik.values.email}
								onChange={formik.handleChange}
								className='form-control'
								id='email'
								placeholder=''
							/>
							<label htmlFor='email'>דו"אל *</label>
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
							<label htmlFor='password'>סיסמה *</label>
							{formik.errors.password && formik.touched.password && (
								<div className='text-danger fw-bold'>
									{formik.errors.password}
								</div>
							)}
						</div>

						<button type='submit' className='btn btn-success w-100'>
							התחברות
						</button>
						<div className='mt-3 text-start'>
							<span className='text-dark fw-bold'>
								עדיין אין לך חשבון ?
							</span>
							<Link to={path.Register}>לחץ כאן להרשמה</Link>
						</div>
					</form>
					<button
						onClick={() => onHide()}
						type='submit'
						className='my-3 btn btn-danger w-100'
					>
						סגירה
					</button>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ForAllModal;
