const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const bcrypt = require ("bcryptjs");
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
    res.json({message: "Le Bistrot d'Andre back-end server"});
});

app.get("/api/login", async (req, res) => {
    try{
        
    }catch(error){
        console.log(error);
    }
});

app.get("/api/signup", async (req, res) => {
    try{
        const {username, password: plainTextPassword, email, firstName, lastName, dateOfBirth, contactNumber} = req.query;
        const pass = await bcrypt.hash(plainTextPassword,10);

        User.countDocuments({username: String(username)}, function(err, count){
            if(count > 0){
                console.log("Username already exists, please choose another username!");
                res.json({
                    status: "success",
                    error: "Username already exists, please choose another username!"
                });
            }else{
                User.countDocuments({email: String(email)}, function(err2, count2){
                    if(count2 > 0){
                        console.log("Email already exists, please choose another email!");
                    }else{
                        const user = new User({
                            username: String(username),
                            email: String(email),
                            password: String(pass),
                            firstName: String(firstName),
                            lastName: String(lastName),
                            dateOfBirth: Date.parse(String(dateOfBirth)),
                            contactNumber: String(contactNumber),
                            userType: 'C'
                        });
                        // user.save();
                        console.log(`${user.username} is successfully saved into the user database`);
                        const customer = new Customer({
                            _id: user._id,
                            personalInformation: user
                        });
                        // customer.save();
                        console.log(`${user.username} is successfully saved into the customer database`);
                    }
                });
            }
        });
    }catch(error){
        console.log(error);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.js'));
})

app.listen(port, () =>{
  console.log(`Server started on port ${port}.`);
});