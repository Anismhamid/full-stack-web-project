import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

interface DecodedToken {
	exp: number;
	iat: number;
	[key: string]: any;
}

function useToken() {
	const [decodedToken, setAfterDecode] = useState<any>(null);
	const token = localStorage.getItem("token");

	useEffect(() => {
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
	}, [token]);


	return {decodedToken, setAfterDecode};
}

export default useToken;
