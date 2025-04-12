const express = require("express");
const router = express.Router();
const Receipt = require("../models/Receipt");
const auth = require("../middlewares/auth");
const {createOrder} = require("../controllers/orderController");
const Joi = require("joi");

// const receiptValidationSchema = Joi.object({
// 	orderNumber: Joi.string().required(),
// 	orderDate: Joi.date(),

// 	customer: Joi.object({
// 		name: Joi.string(),
// 		email: Joi.string().email(),
// 		phone: Joi.string(),
// 		address: Joi.string(),
// 	}),

// 	products: Joi.array()
// 		.items(
// 			Joi.object({
// 				product_name: Joi.string().required(),
// 				quantity: Joi.number().min(1).default(1),
// 				product_price: Joi.number().required(),
// 			}),
// 		)
// 		.min(1)
// 		.required(),

// 	paymentMethod: Joi.string().valid("cash", "credit").required(),

// 	deliveryFee: Joi.number().min(0).default(0),
// 	discount: Joi.number().min(0).max(100).default(0),

// 	totalAmount: Joi.number().min(0).required(),

// 	businessInfo: Joi.object({
// 		name: Joi.string().default("שוק הפינה פירות ירקות ועוד"),
// 		companyId: Joi.string().allow(""),
// 		phone: Joi.string().allow(""),
// 		email: Joi.string().email().allow(""),
// 		address: Joi.string().allow(""),
// 	}).default(),
// });

// router.post("/", auth, async (req, res) => {
// 	try {
// 		const {error} = receiptValidationSchema.validate(req.body);
// 		if (error) res.status(400).send(error.details[0].message);

// 		const newReceipt = new Receipt(req.body);

// 		await newReceipt.save();

// 		res.status(201).send(newReceipt);
// 	} catch (error) {
// 		res.status(500).send(error.message);
// 	}
// });

router.get("/", async (req, res) => {
	try {
		const newReceipt = await Receipt.find();
		if (!newReceipt) return res.status(404).send("No receipts yet");

		res.status(202).send(newReceipt);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.get("/:userId", auth, async (req, res) => {
	try {
		if (req.payload._id !== req.body._id)
			return res.status(401).send("Unautontication");

		const newReceipt = await Receipt.find({userId:req.params.userId});
		if (!newReceipt) return res.status(404).send("No receipts yet");

		res.status(202).send(newReceipt);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
