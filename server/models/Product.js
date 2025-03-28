const mongoose = require("mongoose");

const fruitProductSchema = new mongoose.Schema(
	{
		product_name: {type: String, unique: true, required: true, trim: true},
		category: {type: String, required: true, default: "Fruit"},
		price: {
			type: Number,
			required: true,
			min: [0, "Price must be a positive number"],
		},
		quantity_in_stock: {
			type: Number,
			required: true,
			min: 1,
		},
		description: {
			type: String,
			required: true,
			maxlength: [500, "Description cannot exceed 500 characters"],
		},
		image_url: {
			type: String,
			required: true,
			match: [
				/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/,
				"Please provide a valid image URL",
			],
		},
		sale: {type: Boolean},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
		__v: {type: Number},
	},
	{
		timestamps: true,
	},
);

const Fruits = mongoose.model("Fruits", fruitProductSchema);

module.exports = Fruits;
