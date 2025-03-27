const express = require("express");
const router = express.Router();
const Products = require("../models/Product");
const Joi = require("joi");

const fruitSchema = Joi.object({
	product_name: Joi.string().min(3).max(50).required().trim(),
	category: Joi.string().required().min(2).max(50),
	price: Joi.number().positive().required().min(0).messages({
		"number.min": "Price must be a positive number",
	}),
	quantity_in_stock: Joi.number().required().min(1),
	description: Joi.string().max(500).required().messages({
		"string.max": "Description cannot exceed 500 characters",
	}),
	image_url: Joi.string()
		.uri()
		.regex(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/)
		.required(),
});

module.exports = fruitSchema;

// get all the fruits
router.get("/fruits", async (req, res) => {
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

// get all the vegetable
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

// get a specific fruit by name
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

// post route to create a new fruit product
router.post("/", async (req, res) => {
	try {
		const {error} = fruitSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		// check if exists
		let fruit = Fruits.findOne({product_name: req.params.name});
		if (fruit) res.status(400).send("The fruit is exists");

		// create a new fruit product using the data from the request body
		fruit = new Fruits(req.body);

		// save the new fruit product to the database
		await fruit.save();

		// send the created fruit product
		res.status(201).send(fruit);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;