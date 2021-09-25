var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/user');
const User = mongoose.model("User");

router.get("/", async (req, res) => {
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
module.exports = router;