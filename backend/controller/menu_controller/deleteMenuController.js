var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/meal');
const Meal = mongoose.model("Meal");

router.get("/", async (req, res) => {
    try{
        Meal.deleteMany({}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Successfully deleted all the meals");
                return res.json({status: true});
            }
        });
    }catch(error){
        console.log(error);
        res.json({status: false});
    }
});

module.exports = router;