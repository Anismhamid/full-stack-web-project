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
	payment: Joi.boolean(),
	cashOnDelivery: Joi.boolean(),
	selfCollection: Joi.boolean(),
	delivery: Joi.boolean(),
	sale: Joi.boolean(),
	discount: Joi.number(),
});

const orderSchema = Joi.object({
	products: Joi.array().items(productSchema).min(1).required(),
});

// Post new order from checkOut
router.post("/", auth, async (req, res) => {
	try {
		// validate body
		const {error} = orderSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		const {
			products,
			payment,
			cashOnDelivery,
			selfCollection,
			delivery,
			discount,
			sale,
		} = req.body;

		if (!products || products.length === 0)
			return res.status(400).send("No products provided for the order.");

		// Calculate the total amount for the order on the products
		const totalAmount = products.reduce(
			(total, product) => total + product.product_price * product.quantity,
			0,
		);

		// Generatin an order number
		const orderNumber = `ORD-${Math.floor(Math.random(+1) * 10000)}`;

		// Create a new order
		const newOrder = new Order({
			userId: req.payload._id,
			products: products,
			orderNumber: orderNumber,
			totalAmount: totalAmount,
			payment: payment,
			cashOnDelivery: cashOnDelivery,
			selfCollection: selfCollection,
			delivery: delivery,
			sale: sale,
			discount: discount,
		});

		// Save the order to the database
		await newOrder.save();

		return res.status(201).send(newOrder); // Return the created order
	} catch (error) {
		return res.status(400).send(error.message); // Return server error
	}
});

// Get orders for a specific user
router.get("/:userId", auth, async (req, res) => {
	const userId = req.params.userId;

	if (req.payload._id !== userId) {
		return res.status(403).send("You do not have permission to access these orders.");
	}

	try {
		// Retrieve all orders for the user
		const orders = await Order.find({userId: userId});
		return res.status(200).send(orders);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Server error while fetching orders.");
	}
});

// Get all orders for admin
router.get("/", auth, async (req, res) => {
	try {
		if (!req.payload.isAdmin && !req.payload.isModerator) {
			return res
				.status(403)
				.send("You do not have permission to access these orders.");
		}
		const orders = await Order.find();

		return res.status(200).send(orders);
	} catch (error) {
		return res.status(500).send("Server error while fetching orders.");
	}
});

router.patch("/:orderNumber", auth, async (req, res) => {
	try {
		if (!req.payload.isAdmin && !req.payload.isModerator)
			return res.status(401).send("This user cannot update the product");

		// Find the order and update
		const order = await Order.findOneAndUpdate(
			{orderNumber: req.params.orderNumber},
			{$set: {status: req.body.status}},
			{new: true},
		);
		if (!order) return res.status(404).send("Order not found");

		// Return success status
		res.status(200).send(order);
	} catch (error) {
		return res.status(500).send("Server error while fetching orders.");
	}
});

router.get("/details/:orderNumber", auth, async (req, res) => {
	try {
		const userId = req.payload._id;
		const orderNumber = req.params.orderNumber;

		// Find the order and update
		const order = await Order.findOne({orderNumber: orderNumber, userId: userId});
		if (!order) return res.status(404).send("Order not found");

		// Return success status
		res.status(200).send(order);
	} catch (error) {
		return res.status(500).send("Server error while fetching order items.");
	}
});

module.exports = router;
