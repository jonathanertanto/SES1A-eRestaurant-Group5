var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/Discount');
const Discount = mongoose.model("Discount");

require('../../model/Meal');
const Meal = mongoose.model("Meal");

router.post("/", async (req, res) => {
    try{
        if(String(req.body.discountID) === ""){
            console.log("No discount applied to the reservation!");
            return res.status(400).json({status: false});
        }
        const discount = await Discount.findOne({_id: String(req.body.discountID)});
        if(!discount){
            console.log("No discount applied to the reservation!");
            return res.status(400).json({status: false});
        }
        let nominal;
        switch(String(discount.type).toUpperCase()){
            case "P":
                if(String(discount.meal) !== ""){
                    const idx = findOrdersIndex(req.body.meals, String(discount.meal));
                    nominal = Number(req.body.meals[idx].price) * Number(req.body.orders[idx].quantity);
                }else if(String(discount.mealType).toUpperCase() !== "A" ){
                    nominal = totalTransactioins(req.body.orders, req.body.meals, String(discount.mealType).toUpperCase());
                }else{
                    nominal = Number(req.body.transaction);
                }
                nominal = nominal * Number(discount.nominal) / 100;
                break;
            case "N":
                nominal = discount.nominal;
                let temp = 0;
                if(String(discount.meal) !== ""){
                    const idx = findOrdersIndex(req.body.meals, String(discount.meal));
                    temp = Number(req.body.meals[idx].price) * Number(req.body.orders[idx].quantity);
                }else if(String(discount.mealType).toUpperCase() !== "A" ){
                    temp = totalTransactioins(req.body.orders, req.body.meals, String(discount.mealType));
                }
                nominal = temp < nominal ? temp : nominal;
                break;
            default:
                const idx = findOrdersIndex(req.body.meals, String(discount.meal));
                nominal = Number(req.body.meals[idx].price) * Number(discount.nominal);
                break;
        }
        nominal = roundNumber(nominal);
        return res.status(200).json({status: true, value: nominal, item: discount});
    }catch(error){
        console.log(error);
    }
});
module.exports = router;

const roundNumber = (nominal) => {
    nominal = Number((Number(nominal)*100).toPrecision(15) );
    nominal = Math.round(nominal) / 100;
    return nominal;
}

const totalTransactioins = (orders, meals, type) => {
    let nominal = 0;
    for(let i=0; i<meals.length; ++i){
        if(String(meals[i].type).toUpperCase() === type.toUpperCase() ){
            nominal += Number(meals[i].price) * Number(orders.quantity);
        }
    }
    return nominal;
}

const findOrdersIndex = (meals, meal) => {
    for(let i=0; i<meals.length; ++i){
        if(meals[i]._id === meal){
            return i;
        }
    }
    return -1;
}