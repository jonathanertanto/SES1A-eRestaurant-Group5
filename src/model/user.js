const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username cannot be empty!"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Password must be at least 8 characters!"],
        minLength: 8
    },
    email:{
        type: String,
        required: [true, "Email address cannot be empty!"],
        unique: true
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
        required: [true, "User type must be defined!"],
        maxlength: 2
    }
});

mongoose.model("User", UserSchema);