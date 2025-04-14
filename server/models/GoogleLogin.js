const mongoose = require("mongoose");

const googleUsersSchema = new mongoose.Schema({
	name: {
		first: String,
		last: String,
	},
	email: {type: String, required: true, unique: true},
	image: {
		url: String,
		alt: String,
	},
	googleId: {type: String},
	phone: {
		phone_1: String,
		phone_2: String,
	},
	address: {
		city: String,
		street: String,
		houseNumber: String,
	},
	role: {type: String, default: "Client"},
	status: {type: String, default: "active"},
});

const GoogleUsers = mongoose.model("GoogleUsers", googleUsersSchema);

module.exports = GoogleUsers;
