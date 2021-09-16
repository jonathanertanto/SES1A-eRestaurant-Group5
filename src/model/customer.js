const mongoose = require('mongoose');
const UserSchema = require('./user');
const BookingSchema = require('./booking');

const customerSchema = new mongoose.Schema({
    personalInformation: UserSchema,
    listOfBooking: [BookingSchema]
});

mongoose.model("Customer", customerSchema);
