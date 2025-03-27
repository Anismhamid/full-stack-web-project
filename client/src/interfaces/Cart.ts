export interface Cart {
	userId: string;
	products: [
		{
			product_name: string;
			quantity: number;
			product_price: number;
			product_image: string;
			sale: boolean;
		},
	];
}
