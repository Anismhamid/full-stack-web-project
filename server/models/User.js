const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		_id: {type: String},
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
		name: {
			type: {
				first: {type: String, required: true, minlength: 2, maxlength: 50},
				last: {type: String, required: true, minlength: 2, maxlength: 50},
				username: {
					type: String,
				},
			},
		},
		image: {
			type: {
				url: {
					type: String,
					default:
						"https://banner2.cleanpng.com/20201007/ylw/transparent-patient-icon-healthcare-icon-medical-icon-1713858313379.webp",
				},
				alt: {type: String, default: "Profile image"},
			},
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isModerator: {
			type: Boolean,
			default: false,
		},
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
