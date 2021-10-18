var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/User');
const User = mongoose.model("User");

router.get("/", async (req, res) => {
    try{
        // Check for existing username
        let user = await User.findOne({username: String("admin")});
        if(user){
            return res.status(400).json({message: "Admin already exists"});
        }

        // Insertion of User entity
        user = new User({
            username: String("admin"),
            email: String("lebirstrordandre@gmail.com"),
            password: String("password"),
            firstName: String("Admin"),
            lastName: String(""),
            dateOfBirth: Date.parse("1990-10-10"),
            contactNumber: String("0823456839"),
            userType: 'M'
        });
        user.save();
        console.log(`${user.username} is successfully saved into the user database`);
        res.status(200).json({message: "Created admin user"});
    }catch(error){
        console.log(error);
        res.status(400).json({
            status: false,
            message: error
        });
    }
});
module.exports = router;