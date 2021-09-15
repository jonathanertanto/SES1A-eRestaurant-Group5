const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username cannot be empty!"]
    },
    password:{
        type: String,
        required: [true, "Password must be at least 8 characters!"],
        minLength: 8
    },
    email:{
        type: String,
        required: [true, "Email address cannot be empty!"]
    },
    firstName:{
        type: String,
        required: [true, "First name cannot be empty!"]
    },
    lastName: String,
    dateOfBirth:{
        type: Date,
        required: [true, "Date of Birth cannot be empty!"]
    },
    contactNumber:{
        type: String,
        required: [true, "Contact Number cannot be empty!"]
    },
    userType:{
        type: String,
        required: [true, "User type must be defined!"]
    }
});
var User = mongoose.model("UserSchema", userSchema);

export {userSchema};

export function newUser(un, pass, em, fn, ln, dob, cn, ut){
    const user = new User({
        username: un,
        password: pass,
        email: em,
        firstName: fn,
        lastName: ln,
        dateOfBirth: dob,
        contactNumber: cn,
        userType: ut
    });
    user.save();
    return user;
};