const express = require("express");
const app = express();
require("dotenv").config();
const products = require("./routes/products");
const users = require("./routes/users");
const carts = require("./routes/carts");
const orders = require("./routes/orders");
const discounts = require("./routes/discountAndOffers");
const mongoose = require("mongoose");
const cors = require("cors");
const chalk = require("chalk");
const {logger, logToFile} = require("./middlewares/logger");

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.DB)
	.then(() => console.log(chalk.blue("Connected to mongoDB")))
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});

app.use(logger);
logToFile();
app.use("/api/users", users);
app.use("/api/carts", carts);
app.use("/api/orders", orders);
app.use("/api/products", products);
app.use("/api/discounts", discounts);

app.listen(port, () =>
	console.log(chalk.blue.underline("Server started on port:", port)),
);
