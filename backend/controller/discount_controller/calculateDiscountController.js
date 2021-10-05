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
                nominal = Number( (Number(req.body.transaction) * Number(discount.nominal)).toPrecision(15) );
                nominal = Math.round(nominal) / 100;
                break;
            case "N":
                nominal = discount.nominal;
                break;
            default:
                const idx = findOrdersIndex(req.body.meals, String(discount.meal));
                nominal = Number(req.body.meals[idx].price) * Number(discount.nominal);
                break;
        }
        return res.status(200).json({status: true, value: nominal, item: discount});
    }catch(error){
        console.log(error);
    }
});
module.exports = router;

const findOrdersIndex = (meals, meal) => {
    for(let i=0; i<meals.length; ++i){
        if(meals[i]._id === meal){
            return i;
        }
    }
    return -1;
}