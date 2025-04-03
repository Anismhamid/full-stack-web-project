// Register interface
export interface UserRegister {
	_id?: string;
	name: {
		first: string;
		last: string;
		username?: string;
	};
	email: string;
	password: string;

	image?: {
		url: string;
		alt: string;
	};
	isAdmin: boolean;
	isModerator:boolean
	status?: string;
}

// Login interface
export interface UserLogin {
	email: string;
	password: string;
}