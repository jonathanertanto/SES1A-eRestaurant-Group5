const express = require ("express");
const router = express.Router();
const User = require("../../model/user").model;

router.post("/", async (req, res) => {
    try{
        const {userID, username, password, validationPass, email, firstName, lastName, dateOfBirth, contactNumber} = req.body;
        // Check password
        const user = await User.findOne({_id: String(userID)});
        if(!user || String(user.password) != String(validationPass)){
            console.log("Incorrect Password!");
            return res.status(400).json({
                status: false,
                message: "Incorrect Password!"
            });
        }
        
        // Check for existing username
        const usernameValidation = await User.findOne({username: String(username).toLowerCase()});
        if(usernameValidation && String(username).toLowerCase() != String(user.username)){
            console.log("Username already exists, please choose another username!");
            return res.status(400).json({
                status: false,
                message: "Username already exists, please choose another username!"
            });
        }

        // Check for existing email
        const emailValidation = await User.findOne({email: String(email).toLowerCase()});
        if(emailValidation && String(email).toLowerCase() != String(user.email).toLowerCase()){
            console.log("Email already exists, please choose another email!");
            return res.status(400).json({
                status: false,
                message: "Email already exists, please choose another email!"
            });
        }

        // Validate date of birth
        const date = new Date();
        if(Date.parse(String(dateOfBirth)) >= Date.parse(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()) ){
            console.log("Invalid date of birth, please choose another date!");
            return res.status(400).json({
                status: false,
                message: "Invalid date of birth, please choose another date!"
            });
        }

        // Update User on Database
        User.updateOne({_id: String(userID)}, {
            username: String(username).toLowerCase(),
            email: String(email).toLowerCase(),
            password: String(password),
            firstName: String(firstName),
            lastName: String(lastName),
            dateOfBirth: Date.parse(String(dateOfBirth)),
            contactNumber: String(contactNumber)
        }, async (err) => {
            if(err){
                console.log(err);
                return res.status(400).json({
                    status: false,
                    message: err
                });
            }else{
                console.log("Successfully updated the user's information!");
            }
        });
        return res.status(200).json({
            status: true,
            message: "Account information successfully updated!"
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            status: false,
            message: err
        });
    }
});

module.exports = router;