const User = require("../models/User");
const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const Product = require("../models/Product");
const Carts = require("../models/Cart");
const Joi = require("joi");

const cartSchema = Joi.object({
	userId: Joi.string(),
	product_name: Joi.string().required(),
	quantity: Joi.number().min(1).required(),
	product_price: Joi.number().required(),
	product_image: Joi.string().required(),
	sale: Joi.boolean().default(false),
});

// Add product to cart by name
router.post("/", auth, async (req, res) => {
	try {
		// Validate the request body
		const {error} = cartSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		// Check if the product exists
		let product = await Product.findOne({product_name: req.body.product_name});
		if (!product) return res.status(404).send("This product is not available");

		// Find or create the user's cart
		let cart = await Carts.findOne({userId: req.payload._id});
		if (!cart) {
			cart = new Carts({
				userId: req.payload._id,
				products: [
					{
						product_name: req.body.product_name,
						quantity: req.body.quantity,
						product_price: req.body.product_price,
						product_image: req.body.product_image,
						sale: req.body.sale,
					},
				],
			});
			await cart.save();
		} else {
			// Add the product to the existing cart or update the quantity if it already exists
			const productInCart = cart.products.find(
				(item) => item.product_name === req.body.product_name,
			);
			if (productInCart) {
				productInCart.quantity += req.body.quantity;
			} else {
				cart.products.push({
					product_name: req.body.product_name,
					quantity: req.body.quantity,
					product_price: req.body.product_price,
					product_image: req.body.product_image,
					sale: req.body.sale,
				});
			}
			await cart.save();
		}

		// Update the product stock
		product = await Product.findOneAndUpdate(
			{product_name: req.body.product_name},
			{$inc: {quantity_in_stock: -req.body.quantity}},
			{new: true},
		);

		res.status(200).send("Product added to cart successfully");
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// get spicific cart
router.get("/:id", auth, async (req, res) => {
	try {
		// Find the cart for the specific user by userId
		const cart = await Carts.find();

		// If no cart found, return a 404 error
		if (!cart) {
			return res.status(404).send("Cart not found"); // More meaningful error message
		}

		// Successfully return the cart
		res.status(200).send(cart);
	} catch (error) {
		// Log the error and send 500 status code in case of any failure
		console.error(error);
		res.status(500).send({message: "Failed to load cart", error: error.message});
	}
});

// get carts for admin users
router.get("/admins", auth, async (req, res) => {
	try {
		if (!req.payload.isAdmin) return res.status(401).send("just for admin");

		// Find the cart for the specific user by userId
		const carts = await Carts.find();

		// If no cart found, return a 404 error
		if (!carts) return res.status(404).send("Cart not found"); // More meaningful error message

		// Successfully return the cart
		res.status(200).send(carts);
	} catch (error) {
		console.error(error);
		res.status(500).send(error);
	}
});

module.exports = router;
