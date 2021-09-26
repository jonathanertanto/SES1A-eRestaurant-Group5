var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/meal');
const Meal = mongoose.model("Meal");

router.get("/", async (req, res) => {
    try{
        Meal.find({}).sort('_id').exec( (err, meals) => {
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