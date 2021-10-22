const express = require ("express");
const router = express.Router();
const Meal = require('../../model/meal').model;

router.post("/", async (req, res) => {
    try{
        const {image, name, description, price, cost, type} = req.body;

        const meal = new Meal({
            image: String(image),
            name: String(name),
            description: String(description),
            price: Number(price),
            cost: Number(cost),
            menuType: type
        });
        meal.save();
        console.log("Successfully added the meal item");
        return res.json({status: true});
    }catch(error){
        console.log(error);
        res.json({status: false});
    }
});


module.exports = router;