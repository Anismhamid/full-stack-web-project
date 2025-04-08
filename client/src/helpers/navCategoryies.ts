import { fontAwesomeIcon } from "../FontAwesome/Icons";
import { productsPathes } from "../routes/routes";

export const navbarCategoryLinks = [
	{
		label: "פירות",
		path: productsPathes.Fruits,
		icon: fontAwesomeIcon.Fruit,
	},
	{
		label: "ירקות",
		path: productsPathes.Vegetable,
		icon: fontAwesomeIcon.Vegetable,
	},
	{
		label: "דגים",
		path: productsPathes.fish,
		icon: fontAwesomeIcon.fish,
	},
	{
		label: "מוצרי חלב",
		path: productsPathes.dairy,
		icon: fontAwesomeIcon.dairyProducts,
	},
	{
		label: "בשר",
		path: productsPathes.meat,
		icon: fontAwesomeIcon.meat,
	},
	{
		label: "תבלינים",
		path: productsPathes.spices,
		icon: fontAwesomeIcon.spices,
	},
	{
		label: "מאפים",
		path: productsPathes.bakery,
		icon: fontAwesomeIcon.bakery,
	},
	{
		label: "שתייה",
		path: productsPathes.beverages,
		icon: fontAwesomeIcon.beverages,
	},
	{
		label: "מוצרים קפואים",
		path: productsPathes.forzen,
		icon: fontAwesomeIcon.forzen,
	},
	{
		label: "חטיפים",
		path: productsPathes.snacks,
		icon: fontAwesomeIcon.snacks,
	},
];
