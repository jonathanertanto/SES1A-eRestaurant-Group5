var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/User');
const User = mongoose.model("User");

router.get("/", async (req, res) => {
    try{
        const {userID, password} = req.query;
        // Check password
        const user = await User.findOne({_id: String(userID)});
        if(!user || user.password != password){
            console.log("Incorrect Password!");
            return res.json({
                status: false,
                message: "Incorrect Password!"
            });
        }

        // Delete User from Database
        User.deleteOne({_id: String(userID)}, function(err){
            if(err){
                console.log(err);
                return res.json({
                    status: false,
                    message: err
                });
            }else{
                console.log("Successfully deleted the user from database");
            }
        });
        return res.json({
            status: true,
            message: "Account successfully deleted!"
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