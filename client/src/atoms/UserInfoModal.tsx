import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import {useFormik} from "formik";
import {FunctionComponent} from "react";
import * as yup from "yup";

interface UserInfoModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: {
		phone_1: string;
		phone_2: string;
		city: string;
		street: string;
		houseNumber: string;
	}) => void;
}

const UserInfoModal: FunctionComponent<UserInfoModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const formik = useFormik({
		initialValues: {
			phone_1: "",
			phone_2: "",
			city: "",
			street: "",
			houseNumber: "",
		},
		validationSchema: yup.object({
			phone_1: yup
				.string()
				.required("נדרש מספר טלפון ראשי")
				.matches(/^0\d{8,9}$/, "מספר טלפון לא חוקי"),
			phone_2: yup.string().nullable(),
			city: yup.string().required("נדרשת עיר"),
			street: yup.string().required("נדרש רחוב"),
			houseNumber: yup.string().required("נדרש מספר בית"),
		}),
		onSubmit: (values) => {
			onSubmit(values);
		},
	});

	return (
		<Dialog open={isOpen} onClose={onClose} maxWidth='xs' fullWidth>
			<DialogTitle>השלם את פרטיך</DialogTitle>
			<DialogContent>
				<Box component='form' onSubmit={formik.handleSubmit} noValidate>
					<TextField
						margin='dense'
						label='טלפון ראשי'
						fullWidth
						name='phone_1'
						value={formik.values.phone_1}
						onChange={formik.handleChange}
						error={formik.touched.phone_1 && Boolean(formik.errors.phone_1)}
						helperText={formik.touched.phone_1 && formik.errors.phone_1}
					/>
					<TextField
						margin='dense'
						label='טלפון נוסף'
						fullWidth
						name='phone_2'
						value={formik.values.phone_2}
						onChange={formik.handleChange}
					/>
					<TextField
						margin='dense'
						label='עיר'
						fullWidth
						name='city'
						value={formik.values.city}
						onChange={formik.handleChange}
						error={formik.touched.city && Boolean(formik.errors.city)}
						helperText={formik.touched.city && formik.errors.city}
					/>
					<TextField
						margin='dense'
						label='רחוב'
						fullWidth
						name='street'
						value={formik.values.street}
						onChange={formik.handleChange}
						error={formik.touched.street && Boolean(formik.errors.street)}
						helperText={formik.touched.street && formik.errors.street}
					/>
					<TextField
						margin='dense'
						label='מספר בית'
						fullWidth
						name='houseNumber'
						value={formik.values.houseNumber}
						onChange={formik.handleChange}
						error={
							formik.touched.houseNumber &&
							Boolean(formik.errors.houseNumber)
						}
						helperText={
							formik.touched.houseNumber && formik.errors.houseNumber
						}
					/>
					<DialogActions>
						<Button onClick={onClose} color='secondary'>
							ביטול
						</Button>
						<Button type='submit' color='primary' variant='contained'>
							אישור
						</Button>
					</DialogActions>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

const styles: any = {
	overlay: {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.5)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 1000,
	},
	modal: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 8,
		minWidth: 320,
		textAlign: "center",
	},
	input: {
		width: "100%",
		padding: 10,
		marginTop: 10,
		marginBottom: 10,
	},
	actions: {
		display: "flex",
		justifyContent: "space-between",
		marginTop: 10,
	},
};

export default UserInfoModal;
