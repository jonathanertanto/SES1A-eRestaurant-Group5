const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Date cannot be empty!"]
    }
});

mongoose.model("Booking", BookingSchema);