/**
 * Fruit interface
 */
export interface Fruit {
	_id: number;
	product_name: string;
	category: string;
	price: number;
	quantity_in_stock: number;
	description: string;
	image_url: string;
	sale?: boolean;
}
