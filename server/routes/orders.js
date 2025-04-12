const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const auth = require("../middlewares/auth");
const {createOrder} = require("../controllers/orderController");

router.post("/", auth, (req, res, next) => {
	req.io = req.app.get("io");
	createOrder(req, res, next);
});

// Post new order from checkOut
// router.post("/", auth, async (req, res) => {
// 	try {
// 		// validate body
// 		const {error} = orderSchema.validate(req.body);
// 		if (error) return res.status(400).send(error.details[0].message);

// 		const {products, deliveryFee, totalAmount} = req.body;

// 		if (!products) return res.status(400).send("No products provided for the order.");

// 		const orderNumber = await generateOrderNumber();

// 		// Create a new order
// 		const newOrder = new Order({
// 			...req.body,
// 			userId: req.payload._id,
// 			orderNumber: orderNumber,
// 			deliveryFee: deliveryFee,
// 			totalAmount: totalAmount,
// 		});

// 		// Save the order to the database
// 		await newOrder.save();

// 		io.on("new order", newOrder);

// 		console.log(module.exports);

// 		return res.status(201).send(newOrder); // Return the created order
// 	} catch (error) {
// 		return res.status(400).send(error.message); // Return server error
// 	}
// });

// Get orders for a specific user
router.get("/:userId", auth, async (req, res) => {
	const userId = req.params.userId;

	if (req.payload._id !== userId || !req.payload.role === "Admin") {
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
		if (!req.payload.role === "Admin" && !req.payload.role === "Moderator") {
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

// patch status
router.patch("/:orderNumber", auth, async (req, res) => {
	try {
		if (req.payload.role !== "Admin" && req.payload.role !== "Moderator")
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
		const orderNumber = req.params.orderNumber;

		// Find the order and update
		const order = await Order.findOne({orderNumber: orderNumber});
		if (!order) return res.status(404).send("Order not found");

		// Return success status
		res.status(200).send(order);
	} catch (error) {
		return res.status(500).send("Server error while fetching order items.");
	}
});

module.exports = router;
