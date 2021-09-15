const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Date cannot be empty!"]
    }
});
export {bookingSchema};