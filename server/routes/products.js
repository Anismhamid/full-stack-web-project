const express = require("express");
const router = express.Router();
const Products = require("../models/Product");
const auth = require("../middlewares/auth");
const Joi = require("joi");

const productsSchema = Joi.object({
	product_name: Joi.string().min(3).max(50).required().trim(),
	category: Joi.string().required().min(2).max(50),
	price: Joi.number().positive().required().min(0),
	quantity_in_stock: Joi.number().required().min(1),
	description: Joi.string().max(500).required(),
	image_url: Joi.string().uri().allow(""),
	sale: Joi.boolean().default(false),
	discount: Joi.number(),
});

//==============All-products==========
// Get all products for search in home page
router.get("/", async (req, res) => {
	try {
		// find the products
		const products = await Products.find();
		if (!products) return res.status(404).send("No products to provide");
		res.status(200).send(products);
	} catch (error) {
		res.status(500).json({"Internal server error": error.message});
	}
});

// Post to create a new product
router.post("/", auth, async (req, res) => {
	try {
		if (!req.payload.isAdmin || !req.payload.isModerator)
			return res.status(401).send("Unauthorized");

		const {error} = productsSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		// Check if product already exists
		let product = await Products.findOne({product_name: req.body.product_name});
		if (product) {
			return res.status(400).send("The product already exists");
		}

		// Create a new product using the data from the request body
		product = new Products(req.body);

		// Save the new product to the database
		await product.save();

		// Send the created product back in the response
		res.status(201).send(product);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// Put product

// Patch product

// Delete product
router.delete("/:name", auth, async (req, res) => {
	try {
		if (!req.payload.isAdmin && !req.payload.isModerator)
			return res.status(401).send("Access denied. no token provided");

		// Find the produc and delete
		const productToDelete = await Products.findOneAndDelete({
			product_name: req.params.name,
		});
		if (!productToDelete) res.status(400).send("Error while deleting product");

		res.status(200).send("The product has been deleted");
	} catch (error) {
		res.status(500).send(error.message);
	}
});
//______________End-All-products__________

//================Fruit===============
// Get a specific fruit by name
router.get("/fruit/:name", async (req, res) => {
	try {
		// find the frutes
		const fruit = await Products.findOne({
			category: "Fruit",
			product_name: req.params.name,
		});
		if (!fruit) return res.status(404).send("Fruit not found");

		// return the fruits
		res.status(200).send(fruit);
	} catch (error) {
		res.status(500).send(error);
	}
});

// Get fruits for fruit page
router.get("/fruit", async (req, res) => {
	try {
		// find the frutes
		const fruits = await Products.aggregate([{$match: {category: "Fruit"}}]);
		if (!fruits) return res.status(404).send("No fruits to provide");

		// return the fruits
		res.status(200).send(fruits);
	} catch (error) {
		res.status(500).send(error);
	}
});
//________________End-Fruit_______________

//==============Vegetable=============
// Get vegetable for vegetable page
router.get("/vegetable", async (req, res) => {
	try {
		// find the Vegetable
		const vegetable = await Products.aggregate([{$match: {category: "Vegetable"}}]);
		if (!vegetable) return res.status(404).send("No Vegentable to provide");

		// return the Vegetable
		res.status(200).send(vegetable);
	} catch (error) {
		res.status(500).send(error);
	}
});
//______________End-Vegetable_____________




//================Fish================
// Get all fish products
router.get("/fish", async (req, res) => {
	try {
		const fish = await Products.find({
			category: "Fish",
		});
		if (!fish) return res.status(404).send("Fish not found");
		res.status(200).send(fish);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
//______________End-Fish______________

//============Dairy products==========
// Get dairy products
router.get("/dairy", async (req, res) => {
	try {
		const dairy = await Products.find({
			category: "Dairy",
		});
		if (!dairy) return res.status(404).send("Dairy not found");
		res.status(200).send(dairy);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
//____________End-Dairy products__________

//================Meat================
// Get meat products
router.get("/meat", async (req, res) => {
	try {
		const meat = await Products.find({
			category: "Meat",
		});
		if (!meat) return res.status(404).send("Meat not found");
		res.status(200).send(meat);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
//________________End-Meat________________

//===============Spices===============
router.get("/spices", async (req, res) => {
	try {
		const spices = await Products.find({
			category: "Spices",
		});
		if (!spices) return res.status(404).send("Spices not found");
		res.status(200).send(spices);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
//_______________End-Spices_______________

//===============Bakery=============
router.get("/bakery", async (req, res) => {
	try {
		const bakery = await Products.find({
			category: "Bakery",
		});
		if (!bakery) return res.status(404).send("Bakery not found");
		res.status(200).send(bakery);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
//_______________End-Bakery_____________

//===============Beverages===============
router.get("/beverages", async (req, res) => {
	try {
		const beverages = await Products.find({
			category: "Beverages",
		});
		if (!beverages) return res.status(404).send("Beverages not found");
		res.status(200).send(beverages);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
//_______________End-Beverages_______________

//===============Frozen===============
router.get("/forzen", async (req, res) => {
	try {
		const forzen = await Products.find({
			category: "Forzen",
		});
		if (!forzen) return res.status(404).send("forzen not found");
		res.status(200).send(forzen);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
//_______________End-Frozen_______________

//===============Snacks===============
router.get("/snacks", async (req, res) => {
	try {
		const snacks = await Products.find({
			category: "Snacks",
		});
		if (!snacks) return res.status(404).send("Snacks not found");
		res.status(200).send(snacks);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
//_______________End-Snacks_______________
module.exports = router;
