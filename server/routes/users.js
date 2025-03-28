const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const Jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const _ = require("loadsh");
const Joi = require("joi");
const auth = require("../middlewares/auth");

const userSchema = Joi.object({
	_id: Joi.string(),
	name: Joi.object({
		first: Joi.string().min(3).max(50).required(),
		last: Joi.string().min(2).max(50).required(),
		username: Joi.string().allow("").default("Ghost"),
	}),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(60).required(),
	image: Joi.object({
		url: Joi.string()
			.allow("")
			.default("ghost")
			.default(
				"https://banner2.cleanpng.com/20201007/ylw/transparent-patient-icon-healthcare-icon-medical-icon-1713858313379.webp",
			),
		alt: Joi.string().allow("").default("Ghost"),
	}),
	isAdmin: Joi.boolean().default(false),
	isModerator: Joi.boolean().default(false),
});

// Register user
router.post("/", async (req, res) => {
	try {
		// validate the body
		const {error} = userSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		// check if user exists
		let user = await User.findOne({email: req.body.email}, {password: 0});
		if (user)
			return res.status(400).send("This user already exists. Please try another.");

		user = new User(req.body);
		const salt = bcryptjs.genSaltSync(10);
		user.password = bcryptjs.hashSync(user.password, salt);

		await user.save();

		// create cart
		const cart = new Cart({
			userId: user._id,
			products: [{product_name: "", quantity: 0, product_price: 0}],
		});
		await cart.save();

		// creatre token
		const token = Jwt.sign(
			_.pick(user, ["_id", "name.first", "name.last", "isAdmin", "isModerator"]),
			process.env.JWT_SECRET,
		);

		// return the token
		res.status(200).send(token);
	} catch (error) {
		res.status(400).send(error.message);
	}
});

// Login users
router.post("/login", async (req, res) => {
	try {
		// check if user have pression to get the users
		const user = await User.findOne({email: req.body.email});
		if (!user) return res.status(404).send("Invalid credentials");

		const compare = await bcryptjs.compare(req.body.password, user.password);
		if (!compare) return res.status(400).send("Invalid credentials");

		const token = Jwt.sign(
			{
				_id: user._id,
				firstName: user.name.first,
				lastName: user.name.last,
				isAdmin: user.isAdmin,
				isModerator: user.isModerator,
			},
			process.env.JWT_SECRET,
		);
		res.status(200).send(token);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// get all users for admins
router.get("/", auth, async (req, res) => {
	try {
		// check if user have pression to get the users
		if (!req.payload.isAdmin) return res.status(401).send("You Cannot access");

		const users = await User.find({}, {password: 0});
		if (!users || users.length === 0)
			return res.status(404).send("No have users yet");

		res.status(200).send(users);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
