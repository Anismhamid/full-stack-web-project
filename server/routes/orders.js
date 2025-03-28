const express = require("express");
const Order = require("../models/Order");
const router = express.Router();
const auth = require("../middlewares/auth");
const Joi = require("joi");

const productSchema = Joi.object({
	product_name: Joi.string().required(),
	product_image: Joi.string().uri().optional(),
	product_price: Joi.number().positive().required(),
	quantity: Joi.number().integer().min(1).required(),
});

const orderSchema = Joi.object({
	products: Joi.array().items(productSchema).min(1).required(),
});

router.post("/", auth, async (req, res) => {
	// validate body
	const {error} = orderSchema.validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const {products} = req.body;
	if (!products || products.length === 0) {
		return res.status(400).send("No products provided for the order.");
	}

	// Calculate the total amount for the order on the products
	const totalAmount = products.reduce(
		(total, product) => total + product.product_price * product.quantity,
		0,
	);

	// Generate an order number
	const orderNumber = `ORD-${Date.now()}`;

	try {
		// Create a new order
		const newOrder = new Order({
			userId: req.payload._id,
			orderNumber: orderNumber,
			totalAmount: totalAmount,
		});

		// Save the order to the database
		await newOrder.save();

		return res.status(201).send(newOrder); // Return the created order
	} catch (error) {
		return res.status(500).send(error.message); // Return server error
	}
});

// Get all orders for a specific user
router.get("/:userId", auth, async (req, res) => {
	const userId = req.params.userId;

	if (req.payload._id !== userId) {
		return res.status(403).send("You do not have permission to access these orders.");
	}

	try {
		// Retrieve all orders for the user
		const orders = await Order.find({userId: userId});
		return res.status(200).json(orders); // Return all orders for the user
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error while fetching orders.");
	}
});

// Get all orders for a user
router.get("/:userId", auth, async (req, res) => {
	if (req.payload._id !== req.params.userId) {
		return res.status(403).send("You do not have permission to access these orders.");
	}

	try {
		// Retrieve all orders for the user
		const orders = await Order.find({user: userId}).populate("user"); // Populate user details if needed
		return res.status(200).json(orders); // Return all orders for the user
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error while fetching orders.");
	}
});

router.get("/", auth, async (req, res) => {
	if (!req.payload.isAdmin) {
		return res.status(403).send("You do not have permission to access these orders.");
	}

	try {
		// Retrieve all orders for the user
		const orders = await Order.find(); // Populate user details if needed
		return res.status(200).json(orders); // Return all orders for the user
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error while fetching orders.");
	}
});

module.exports = router;
