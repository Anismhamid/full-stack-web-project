export const emptyAuthValues = {
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
};


export interface AuthValues {
	_id?: string;
	name: {
		first: string;
		last: string;
	};
	image?: {
		url: string;
		alt: string;
	};
	role?: string;
	iat?: number;
}
