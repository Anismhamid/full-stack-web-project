import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	FunctionComponent,
} from "react";

type Auth = {
	_id: string;
	name: {
		first: string;
		last: string;
	};
	isAdmin: boolean;
	isModerator: boolean;
	iat: number;
};

interface UserContextType {
	auth: Auth | null;
	setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
	isLoggedIn: boolean;
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | null>(null);

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
	const [auth, setAuth] = useState<Auth | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
