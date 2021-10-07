var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/Meal');
const Meal = mongoose.model("Meal");

router.post("/", async (req, res) => {
    try{
        Meal.find({}).sort([['type', -1]]).exec( (err, meals) => {
            if(err){
                console.log(err);
            }else{
                return res.json({menuItem: meals});
            }
        });
    }catch(error){
        console.log(error);
    }
});

module.exports = router;