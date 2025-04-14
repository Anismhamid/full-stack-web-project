const express = require("express");
const User = require("../models/User");
const Carts = require("../models/Cart");
const jwt = require("jsonwebtoken");
const _ = require("loadsh");

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		let user = await User.findOne({googleId: req.body.googleId});

		if (!user) {
			user = new User({
				googleId: req.body.googleId,
				email: req.body.email,
				name: {
					first: req.body.name.first || "N/A",
					last: req.body.name.last || "N/A",
				},
				image: {
					url: req.body.image.url || "",
					alt: req.body.image.alt || "",
				},
				role: "Client",
				status: "active",
				phone: {
					phone_1: "אין",
					phone_2: "",
				},
				address: {
					city: "אין",
					street: "אין",
					houseNumber: "אין",
				},
				password: "default123",
				activity: [],
				registrAt: new Date().toISOString(),
			});

			await user.save();

			// create cart
			const cart = new Carts({
				userId: user._id,
				products: [],
			});
			await cart.save();
		}

		const token = jwt.sign(
			_.pick(user, ["_id", "name.first", "name.last", "email", "role"]),
			process.env.JWT_SECRET,
			{expiresIn: "1h"},
		);

		res.status(201).send({token});
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
