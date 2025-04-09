const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Cart = require("../models/Cart");
const Jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const _ = require("loadsh");
const Joi = require("joi");
const auth = require("../middlewares/auth");
const chalk = require("chalk");

const userSchema = Joi.object({
	name: Joi.object({
		first: Joi.string().min(3).max(50).required(),
		last: Joi.string().min(2).max(50).required(),
	}),
	phone: Joi.object({
		phone_1: Joi.string().min(9).max(10).required(),
		phone_2: Joi.string().allow(""),
	}),
	address: Joi.object({
		city: Joi.string().min(2).max(20).required(),
		street: Joi.string().min(2).max(20).required(),
		houseNumber: Joi.string().allow(""),
	}),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(60).required(),
	image: Joi.object({
		url: Joi.string()
			.uri()
			.allow("")
			.default("https://cdn-icons-png.flaticon.com/512/64/64572.png"),
		alt: Joi.string().allow(""),
	}),
	role: Joi.string().valid("Admin", "Moderator", "Client").default("Client"),
	activity: Joi.array(),
	registrAt: Joi.string(),
});

const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(60).required(),
});

const roleType = {
	Admin: "Admin",
	Moderator: "Moderator",
	Client: "Client",
};

// Register new user
router.post("/", async (req, res) => {
	try {
		// validate the body
		const {error} = userSchema.validate(req.body, {stripUnknown: false});
		if (error) return res.status(400).send(error.details[0].message);

		// check if user exists
		let user = await User.findOne({email: req.body.email}, {password: 0});
		if (user)
			return res.status(400).send("This user already exists. Please try another.");

		user = new User({
			...req.body,
			registrAt: Date.now().toLocaleString("he-IL"),
		});
		const salt = bcryptjs.genSaltSync(10);
		user.password = bcryptjs.hashSync(user.password, salt);

		await user.save();

		// create cart
		const cart = new Cart({
			userId: user._id,
			products: [],
		});

		await cart.save();

		// creatre token
		const token = Jwt.sign(
			_.pick(user, ["_id", "name.first", "name.last", "role"]),
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
		// Validate body
		const {error} = loginSchema.validate(req.body);
		if (error) return res.status(400).send(error.details[0].message);

		// Check if user have pression to get the users
		let user = await User.findOne({email: req.body.email});
		if (!user) return res.status(400).send("Invalid credentials");

		// Check password
		const compare = await bcryptjs.compare(req.body.password, user.password);
		if (!compare) {
			console.log(chalk.red("invalid email or password please try again"));

			return res.status(400).send("Invalid credentials");
		}

		user.activity.push(new Date().toISOString("he-IL"));
		await user.save();

		const token = Jwt.sign(
			_.pick(user, ["_id", "name.first", "name.last", "role", "image.url"]),
			process.env.JWT_SECRET,
		);

		res.status(200).send(token);
	} catch (error) {
		console.log(chalk.red("Error during login:", error));
		res.status(500).send(error.message);
	}
});

// get all users for admins
router.get("/", auth, async (req, res) => {
	try {
		// check if user have pression to get the users
		if (!req.payload.role === roleType.Admin)
			return res.status(401).send("You Cannot access");

		const users = await User.find().select("-password");
		if (!users) return res.status(404).send("No have users yet");

		res.status(200).send(users);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

// get user byId
router.get("/:userId", auth, async (req, res) => {
	try {
		// check if user have pression to get the user by id
		if (
			!req.payload.role === roleType.Admin &&
			!req.payload.role === roleType.Moderator
		)
			return res.status(401).send("You Cannot access");

		const user = await User.findOne({_id: req.params.userId}).select("-password");
		if (!user) return res.status(404).send("user Not Found");

		res.status(200).send(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.patch("/role/:userEmail", auth, async (req, res) => {
	try {
		// Cehck permission
		if (!req.payload.role === roleType.Admin)
			return res.status(401).send("Access denied. no token provided");

		const user = await User.findOneAndUpdate(
			{email: req.params.userEmail},
			{role: req.body.role},
			{new: true},
		);

		// Check if user exists
		if (!user) {
			return res.status(404).send("User noot found");
		}

		res.status(200).send(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
