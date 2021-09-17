const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
require('./user');
require('./customer');
require('./booking');

const User = mongoose.model("User");
const Customer = mongoose.model("Customer");
const Booking = mongoose.model("Booking");
mongoose.connect("mongodb://localhost:27017/LeBistrotdAndreDB", {useNewUrlParser: true});

mongoose.connection.on("connected", () =>{
    console.log("Successfully connected!");
});

mongoose.connection.on("error",(err) => {
    console.log(err);
})

app.use(express.static(path.resolve(__dirname, '../index.js')));
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({
        status: "success",
        message: "Le Bistrot d'Andre back-end server"
    });
});

app.get("/api/login", async (req, res) => {
    try{
        const {username, email, password} = req.query;
        let user = await User.findOne({username: String(username)});
        if(!user){
            console.log("Invalid username. Searching for email...");
            user = await User.findOne({email: String(email)});
        }
        if(!user){
            console.log("Invalid username/email!");
            return res.json({
                status: false,
                message: "Invalid username/email and/or password!"
            });
        }else{
            if(String(password) === String(user.password)){
                console.log("Login successful!");
                return res.json({
                    status: true,
                    userID: user._id
                });
            }
        }
        console.log("Invalid password");
        return res.json({
            status: false,
            message: "Invalid username/email and/or password!"
        });
    }catch(error){
        console.log(error);
        res.json({
            status: false
        });
    }
});

app.get("/api/signup", async (req, res) => {
    try{
        const {username, password, email, firstName, lastName, dateOfBirth, contactNumber} = req.query;
        // Check for existing username
        let user = await User.findOne({username: String(username)});
        if(user){
            console.log("Username already exists, please choose another username!");
            return res.json({
                status: false,
                message: "Username already exists, please choose another username!"
            });
        }

        // Check for existing email
        user = await User.findOne({email: String(email)});
        if(user){
            console.log("Email already exists, please choose another email!");
            return res.json({
                status: false,
                message: "Email already exists, please choose another email!"
            });
        }

        // Insertion of User entity
        user = new User({
            username: String(username),
            email: String(email),
            password: String(password),
            firstName: String(firstName),
            lastName: String(lastName),
            dateOfBirth: Date.parse(String(dateOfBirth)),
            contactNumber: String(contactNumber),
            userType: 'C'
        });
        user.save();
        console.log(`${user.username} is successfully saved into the user database`);

        // Insertion of Customer entity
        const customer = new Customer({
            _id: user._id,
            personalInformation: user
        });
        customer.save();
        console.log(`${user.username} is successfully saved into the customer database`);

        // Successful Message
        return res.json({
            status: true,
            message: `${user.username} is successfully saved into the customer database`
        });
    }catch(error){
        console.log(error);
        res.json({
            status: false,
            message: error
        });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.js'));
})

app.listen(port, () =>{
  console.log(`Server started on port ${port}.`);
});