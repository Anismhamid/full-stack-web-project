const Order = require("../models/Order");

module.exports = (io, socket) => {
	socket.on("order:read", async (orderId) => {
		try {
			const order = await Order.findById(orderId);
			if (!order) {
				socket.emit("order:error", "Order not found");
			} else {
				socket.emit("order:details", order);
			}
		} catch (error) {
			socket.emit("order:error", error.message);
		}
	});
};
