const express = require("express");
const GoogleUsers = require("../models/GoogleLogin");
const Carts = require("../models/Cart");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		// Try to find the user by their Google ID or email
		let user = await GoogleUsers.findOne({googleId: req.body.googleId});

		if (!user) {
			user = new GoogleUsers({
				googleId: req.body.googleId,
				email: req.body.email,
				name: {
					first: req.body.given_name,
					last: req.body.family_name,
				},
				image: {
					url: req.body.picture,
					alt: req.body.given_name,
				},
				role: "Client",
				status: "active",
			});
			await user.save();

			// create cart
			const cart = new Carts({
				userId: req.body.googleId,
				products: [],
			});
			await cart.save();

			const token = jwt.sign(
				{
					_id: user.googleId,
					name: user.name,
					email: user.email,
					role: user.role,
					picture: user.picture,
				},
				process.env.JWT_SECRET,
				{expiresIn: "7d"},
			);

			res.status(201).json(token);
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
