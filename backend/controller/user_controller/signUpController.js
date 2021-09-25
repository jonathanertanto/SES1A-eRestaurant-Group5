var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/user');
const User = mongoose.model("User");
require('../../model/customer');
const Customer = mongoose.model("Customer");

router.get("/", async (req, res) => {
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

        // Validate date of birth
        const date = new Date();
        if(Date.parse(String(dateOfBirth)) >= Date.parse(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()) ){
            console.log("Invalid date of birth, please choose another date!");
            return res.json({
                status: false,
                message: "Invalid date of birth, please choose another date!"
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
            message: `${user.username} is successfully saved into the customer database`,
            userID: user._id
        });
    }catch(error){
        console.log(error);
        res.json({
            status: false,
            message: error
        });
    }
});
module.exports = router;