const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: [true, "Order quantity cannot be empty"]
    },
    notes: String,
    meal: {
        type: String,
        required: [true, "Order must reference to a specific meal"]
    },
    reservation: String
});

module.exports.model = module.exports.model = mongoose.model("Order", OrderSchema);