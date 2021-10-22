const express = require ("express");
const router = express.Router();
const Meal = require('../../model/meal').model;

router.get("/", async (req, res) => {
    try{
        Meal.deleteMany({}, (err) => {
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