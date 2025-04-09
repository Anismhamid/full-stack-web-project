import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	FunctionComponent,
} from "react";

// Define the Auth type
type Auth = {
	_id: string;
	name: {
		first: string;
		last: string;
	};
	image: {
		url: string;
		alt: string;
	};
	role: string;
	iat: number;
};

// UserContext type
interface UserContextType {
	auth: Auth;
	setAuth: React.Dispatch<React.SetStateAction<Auth>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultUserContext: UserContextType = {
	auth: {
		_id: "",
		name: {
			first: "",
			last: "",
		},
		image: {
			url: "",
			alt: "",
		},
		role: "",
		iat: 0,
	},
	setAuth: () => {},
	isLoggedIn: false,
	setIsLoggedIn: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};

interface UserProviderProps {
	children: ReactNode;
}

export const UserProvider: FunctionComponent<UserProviderProps> = ({children}) => {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [auth, setAuth] = useState<Auth>({
		_id: "",
		name: {
			first: "",
			last: "",
		},
		image: {
			url: "",
			alt: "",
		},
		role: "",
		iat: 0,
	});

	return (
		<UserContext.Provider
			value={{
				auth,
				setAuth,
				isLoggedIn,
				setIsLoggedIn,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
