export interface Order {
	userId: string;
	orderNumber: string;
	products: [
		{
			product_name: string;
			product_image: string;
			product_price: number;
			quantity: number;
		},
	];
	status: string;
	totalAmount: number;
	date:string;
	createdAt:string;
	updatedAt:string;
	__v: 0;
}
