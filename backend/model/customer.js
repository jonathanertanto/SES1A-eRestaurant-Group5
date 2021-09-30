const mongoose = require('mongoose');
const UserSchema = require('./User');
const ReservationSchema = require('./Reservation');

const customerSchema = new mongoose.Schema({
    personalInformation: UserSchema,
    listOfBooking: [ReservationSchema]
});

mongoose.model("Customer", customerSchema);
