import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import axios from "axios";
import {useUser} from "../context/useUSer";
import {showSuccess, showError} from "../atoms/Toast";
import {FunctionComponent} from "react";
import {Box, Button, CircularProgress, MenuItem, TextField} from "@mui/material";
import {Col, Row} from "react-bootstrap";
import {cities} from "../interfaces/cities";

interface CompleteProfileProps {}

/**
 * Auth complete profile
 * @returns inputs to colmplate the fileds on database
 */
const CompleteProfile: FunctionComponent<CompleteProfileProps> = () => {
	const {auth} = useUser();
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			phone_1: "",
			phone_2: "",
			city: "",
			street: "",
			houseNumber: "",
		},
		validationSchema: yup.object({
			phone_1: yup.string().required("נדרש מספר טלפון"),
			city: yup.string().required("עיר נדרשת"),
			street: yup.string().required("רחוב נדרש"),
		}),
		onSubmit: async (values) => {
			try {
				await axios.put(
					`${import.meta.env.VITE_API_URL}/users/${auth._id}`,
					values,
					{
						headers: {
							Authorization: localStorage.getItem("token"),
						},
					},
				);
				showSuccess("הפרופיל עודכן בהצלחה!");
				navigate("/");
			} catch (err) {
				showError("שגיאה בעדכון הפרופיל");
				console.error(err);
			}
		},
	});

	return (
		<main
			style={{minHeight: "600px"}}
			className=' d-flex align-items-center justify-content-center'
		>
			<Box className='container d-flex align-items-center justify-content-center flex-column'>
				<h2 className='text-center'>השלמת פרופיל</h2>
				<form onSubmit={formik.handleSubmit} className='mt-4'>
					<Row>
						<Col>
							<TextField
								label='טלפון ראשי'
								name='phone_1'
								type='text'
								value={formik.values.phone_1}
								onChange={formik.handleChange}
								error={
									formik.touched.phone_1 &&
									Boolean(formik.errors.phone_1)
								}
								helperText={
									formik.touched.phone_1 && formik.errors.phone_1
								}
								fullWidth
								className='my-2'
								variant='outlined'
							/>
						</Col>

						<Col>
							<TextField
								label='טלפון נוסף (אופציונלי)'
								name='phone_2'
								type='text'
								value={formik.values.phone_2}
								onChange={formik.handleChange}
								fullWidth
								className='my-2'
								variant='outlined'
							/>
						</Col>
						<Row>
							<Col>
								<TextField
									select
									label='עיר'
									name='city'
									value={formik.values.city}
									onChange={formik.handleChange}
									error={
										formik.touched.city && Boolean(formik.errors.city)
									}
									helperText={formik.touched.city && formik.errors.city}
									fullWidth
									className='my-2'
									variant='outlined'
								>
									<MenuItem value=''>
										<em>בחר עיר</em>
									</MenuItem>
									{cities.map((city, idx) => (
										<MenuItem key={idx} value={city}>
											{city}
										</MenuItem>
									))}
								</TextField>
							</Col>
							<Col>
								<TextField
									label='רחוב'
									name='street'
									type='text'
									value={formik.values.street}
									onChange={formik.handleChange}
									error={
										formik.touched.street &&
										Boolean(formik.errors.street)
									}
									helperText={
										formik.touched.street && formik.errors.street
									}
									fullWidth
									className='my-2'
									variant='outlined'
								/>
							</Col>
							<Col>
								<TextField
									label='מספר בית'
									name='houseNumber'
									type='text'
									value={formik.values.houseNumber}
									onChange={formik.handleChange}
									fullWidth
									className='my-2'
									variant='outlined'
								/>
							</Col>
						</Row>
						<Box className='text-center mt-3 w-50 m-auto'>
							<Button
								type='submit'
								variant='contained'
								color='primary'
								disabled={formik.isSubmitting}
								fullWidth
							>
								{formik.isSubmitting ? (
									<CircularProgress size={24} color='inherit' />
								) : (
									"שמור"
								)}
							</Button>
						</Box>
					</Row>
				</form>
			</Box>
		</main>
	);
};

export default CompleteProfile;
