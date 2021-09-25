var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/user');
const User = mongoose.model("User");
require('../../model/customer');
const Customer = mongoose.model("Customer");

router.get("/", async (req, res) => {
    try{
        const {userID, username, password, validationPass, email, firstName, lastName, dateOfBirth, contactNumber} = req.query;
        // Check password
        let user = await User.findOne({_id: String(userID)});
        if(!user || user.password != validationPass){
            console.log("Incorrect Password!");
            return res.json({
                status: false,
                message: "Incorrect Password!"
            });
        }
        
        // Check for existing username
        user = await User.findOne({username: String(username)});
        if(user && String(username) != user.username){
            console.log("Username already exists, please choose another username!");
            return res.json({
                status: false,
                message: "Username already exists, please choose another username!"
            });
        }

        // Check for existing email
        user = await User.findOne({email: String(email)});
        if(user && String(email) != user.email){
            console.log("Email already exists, please choose another email!");
            return res.json({
                status: false,
                message: "Email already exists, please choose another email!"
            });
        }

        // Validate date of birth
        const date = new Date();
        if(Date.parse(String(dateOfBirth)) >= Date.parse(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()) ){
            console.log("Invalid date of birth, please choose another date!");
            return res.json({
                status: false,
                message: "Invalid date of birth, please choose another date!"
            });
        }

        // Update User on Database
        User.updateOne({_id: String(userID)}, {
            username: String(username),
            email: String(email),
            password: String(password),
            firstName: String(firstName),
            lastName: String(lastName),
            dateOfBirth: Date.parse(String(dateOfBirth)),
            contactNumber: String(contactNumber)
        }, async (err) => {
            if(err){
                console.log(err);
                return res.json({
                    status: false,
                    message: err
                });
            }else{
                console.log("Successfully updated the user's information!");
                
                if(user.userType==="C"){
                    const customer = await Customer.findOne({ _id: String(userID) });
                    customer.personalInformation = await User.findOne({_id: String(userID)});
                    const updated = await customer.save();
                    console.log("Successfully updated the customers's information!");
                }
                return res.json({
                    status: true,
                    message: "Account information successfully updated!"
                });
            }
        });
    }catch(error){
        console.log(error);
        return res.json({
            status: false,
            message: err
        });
    }
});

module.exports = router;