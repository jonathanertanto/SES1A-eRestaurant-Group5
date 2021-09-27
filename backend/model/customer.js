const mongoose = require('mongoose');
const UserSchema = require('./user');
const ReservationSchema = require('./reservation');

const customerSchema = new mongoose.Schema({
    personalInformation: UserSchema,
    listOfBooking: [ReservationSchema]
});

mongoose.model("Customer", customerSchema);
