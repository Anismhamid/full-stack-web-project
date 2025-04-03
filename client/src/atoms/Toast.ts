import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccess = (message: string) => {
	toast.success(message, {
		position: "bottom-left",
		autoClose: 2000,
		hideProgressBar: true,
		closeOnClick: true,
		rtl: true,
		pauseOnFocusLoss: true,
		draggable: true,
		pauseOnHover: false,
		theme: "dark",
	});
};

export const showError = (message: string) => {
	toast.error(message, {
		position: "bottom-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		rtl: true,
		pauseOnFocusLoss: true,
		draggable: true,
		pauseOnHover: true,
		theme: "dark",
	});
};

export const showInfo = (message: string) => {
	toast.info(message, {
		position: "bottom-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		rtl: true,
		pauseOnFocusLoss: true,
		draggable: true,
		pauseOnHover: true,
		theme: "dark",
	});
};

export const showWarning = (message: string) => {
	toast.warn(message, {
		position: "bottom-left",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		rtl: true,
		pauseOnFocusLoss: true,
		draggable: true,
		pauseOnHover: true,
		theme: "dark",
	});
};
