const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: {
				first: {type: String, required: true, minlength: 2, maxlength: 50},
				last: {type: String, required: true, minlength: 2, maxlength: 50},
			},
		},
		phone: {
			type: {
				phone_1: {type: String, required: true},
				phone_2: {type: String},
			},
		},
		address: {
			type: {
				city: {type: String, required: true},
				street: {type: String, required: true},
				houseNumber: {type: String},
			},
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/\S+@\S+\.\S+/, "Please enter a valid email"], // אימות תקינות האימייל
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 60,
		},
		image: {
			type: {
				url: {
					type: String,
				},
				alt: {type: String},
			},
		},
		role: {
			type: String,
			enum: ["Admin", "Moderator", "Client"],
			default: "Client",
		},
		activity: {type: Array, required: true},
		registrAt: {type: String},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{timestamps: true},
);

const User = mongoose.model("User", userSchema);

module.exports = User;
