const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    name: String,
    unit_number: Number,
    street_name: String,
    postal_code: Number,
    city: String,
    state: String,
    contact_number: String
});

mongoose.model("Reservation", ReservationSchema);