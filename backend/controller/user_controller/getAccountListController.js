const express = require ("express");
const router = express.Router();
const User = require("../../model/user").model;

router.post("/", async (req, res) => {
    try{
        let users;
        switch(String(req.body.accountType).toUpperCase()){
            case "MANAGER":
                users = await User.find({userType: 'M'});
                break;
            case "EMPLOYEE":
                users = await User.find({userType: 'E'});
                break;
            case "CUSTOMER":
                users = await User.find({userType: 'C'});
                break;
            default:
                users = await User.find({});
                break;
        }
        if(users.length <= 0){
            console.log("No account with the selected type registered on the database!");
            return res.status(400).json({status: false, message: "No account with the selected type registered on the database!"});
        }
        return res.status(200).json({status: true, users: users});
    }catch(error){
        console.log(error);
        return res.status(400).json({status: false, message: error});
    }
});
module.exports = router;