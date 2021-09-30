var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/User');
const User = mongoose.model("User");

router.get("/", async (req, res) => {
    try{
        const {userID} = req.query;
        let user = await User.findOne({_id: String(userID)});
        if(!user){
            return res.json({
                status: false,
                message: "invalid user id"
            });
        }
        return res.json({
            status: true,
            id: user._id,
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            dateOfBirth: user.dateOfBirth,
            contactNumber: user.contactNumber,
            userType: user.userType
        });
    }catch(error){
        console.log(error);
        return res.json({
            status: false,
            message: error
        });
    }
});

module.exports = router;