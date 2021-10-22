const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    number_of_people: {
        type: Number,
        required: [true, "Number of people cannot be empty!"],
        min: [1, "Number of people must be at least 1!"]
    },
    notes: String,
    discount: String,
    completeness: Boolean,
    table: String,
    user: String
});

module.exports.model = mongoose.model("Reservation", ReservationSchema);