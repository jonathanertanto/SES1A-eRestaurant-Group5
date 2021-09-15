const mongoose = require('mongoose');
import {userSchema, newUser} from './user.js';
import {bookingSchema} from './booking.js'

const customerSchema = new mongoose.Schema({
    personalInformation: userSchema,
    listOfBooking: [bookingSchema]
});

const Customer = mongoose.model("Customer", customerSchema);

export function signUp(un, pass, em, fn, ln, dob, cn, ut){
    const user = newUser(un, pass, em, fn, ln, dob, cn, ut);
    const customer = new Customer({ _id: user._id });
    customer.save();
}