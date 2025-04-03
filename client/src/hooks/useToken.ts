import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

interface DecodedToken {
	exp: number;
	iat: number;
	[key: string]: any;
}

function useToken() {
	const [decodedToken, setAfterDecode] = useState<any>(null);
	// const [lastActivityTime, setLastActivityTime] = useState<number>(Date.now());
	const token = localStorage.getItem("token");

	useEffect(() => {
		const checkToken = () => {
			if (token) {
				try {
					const decoded: DecodedToken = jwtDecode(token);
					const currentTime = Math.floor(Date.now() / 1000);

					// Expiration check
					if (decoded.exp < currentTime) {
						localStorage.removeItem("token");
						setAfterDecode(null);
					} else {
						setAfterDecode(decoded);
					}
				} catch (error) {
					console.log("Invalid token:", error);
					localStorage.removeItem("token");
					setAfterDecode(null);
				}
			}
		};

		// TODO Problem with eventListener

		// const handleUserActivity = () => {
		// 	setLastActivityTime(Date.now());
		// };

		// const autoLogout = () => {
		// 	const currentTime = Date.now();
		// 	const inactiveTime = currentTime - lastActivityTime;

		// 	// if more than 4 hours has passed since the last activity
		// 	if (inactiveTime > 4 * 60 * 60 * 1000) {
		// 		localStorage.removeItem("token");
		// 		setAfterDecode(null); // Reset state to null after inactivity
		// 	}
		// };

		checkToken();

		// window.addEventListener("keydown", handleUserActivity);
		// window.addEventListener("mousemove", handleUserActivity);

		// const inactivityInterval = setInterval(autoLogout, 50000);

		// const handleStorageChange = () => {
		// 	checkToken();
		// };

		// window.addEventListener("storage", handleStorageChange);

		// // Cleanup event listeners and interval on component unmount
		// return () => {
		// 	window.removeEventListener("keydown", handleUserActivity);
		// 	window.removeEventListener("mousemove", handleUserActivity);
		// 	window.removeEventListener("storage", handleStorageChange);
		// 	clearInterval(inactivityInterval);
		// };
	}, [token]);

	return {decodedToken, setAfterDecode};
}

export default useToken;
