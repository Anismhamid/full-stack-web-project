export interface Order {
	userId: string;
	orderNumber: string;
	products: [
		{
			_id?: string;
			product_name: string;
			product_image: string;
			product_price: number;
			quantity: number;
			payment: boolean;
			cashOnDelivery: boolean;
			selfCollection: boolean;
			delivery: boolean;
			sale: boolean;
			discount: number;
		},
	];
	status: string;
	totalAmount: number;
	date: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
