const express = require ("express");
const router = express.Router();
const Meal = require('../../model/meal').model;

router.post("/", async (req, res) => {
    try{
        const data = await Meal.find({});

        if(data.length <= 0){
            return res.json({menuItem: ""});
        }
        return res.json({menuItem: data.sort((a, b) => (a.type > b.type) ? -1: 1)});
    }catch(error){
        console.log(error);
    }
});

module.exports = router;