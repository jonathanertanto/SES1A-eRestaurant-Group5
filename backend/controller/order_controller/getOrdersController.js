const express = require ("express");
const router = express.Router();
const Meal = require('../../model/meal').model;
const Order = require ("../../model/Order").model;

router.post("/", async (req, res) => {
    try{
        const orders = await Order.find({reservation: String(req.body.reservation)});
        if(orders.length <= 0){
            console.log("No reservation found!")
            return res.status(400).json({
                orders: "",
                meals: ""
            });
        }
        const meals = [];
        for(let i=0; i<orders.length; ++i){
            const meal = await Meal.findOne({_id: String(orders[i].meal)});
            meals.push(meal);
        }
        console.log(`Successfully get all orders from reservation ID: ${req.body.reservation}`);
        return res.status(200).json({
            orders: orders,
            meals: meals
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            orders: "",
            meals: ""
        });
    }
});
module.exports = router;