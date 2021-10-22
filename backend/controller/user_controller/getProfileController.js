const express = require ("express");
const router = express.Router();
const User = require("../../model/user").model;

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
        return res.status(200).json({
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
        return res.status(400).json({
            status: false,
            message: error
        });
    }
});

module.exports = router;