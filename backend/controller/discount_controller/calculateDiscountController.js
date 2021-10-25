const express = require ("express");
const router = express.Router();
const Discount = require('../../model/Discount').model;

router.post("/", async (req, res) => {
    try{
        const data = await calculateDiscount(req.body.discountID, req.body.orders, req.body.meals, req.body.transaction);
        if(data[0]){
           res.status(200).json({status: true, value: data[1], item: data[2]}); 
        }else{
            res.status(400).json({status: false, value: 0, item: ""});
        }
    }catch(error){
        console.log(error);
    }
});
module.exports = router;

const calculateDiscount = async (discountID, orders, meals, transaction) => {
    try{
        if(String(discountID) === ""){
            console.log("No discount applied to the reservation!");
            return [false, 0, ""];
        }
        const discount = await Discount.findOne({_id: String(discountID)});
        if(!discount){
            console.log("No discount applied to the reservation!");
            return [false, 0, ""];
        }
        let nominal;
        switch(String(discount.type).toUpperCase()){
            case "P":
                if(String(discount.meal) !== ""){
                    const idx = findOrdersIndex(meals, String(discount.meal));
                    if(idx === -1){
                        break;
                    }
                    nominal = Number(meals[idx].price) * Number(orders[idx].quantity);
                }else if(String(discount.mealType).toUpperCase() !== "A" ){
                    nominal = totalTransactioins(orders, meals, String(discount.mealType).toUpperCase());
                }else{
                    nominal = Number(transaction);
                }
                nominal = nominal * Number(discount.nominal) / 100;
                break;
            case "N":
                nominal = discount.nominal;
                let temp = 0;
                if(String(discount.meal) !== ""){
                    const idx = findOrdersIndex(meals, String(discount.meal));
                    if(idx === -1){
                        break;
                    }
                    temp = Number(meals[idx].price) * Number(orders[idx].quantity);
                }else if(String(discount.mealType).toUpperCase() !== "A" ){
                    temp = totalTransactioins(orders, meals, String(discount.mealType));
                }
                nominal = temp < nominal ? temp : nominal;
                break;
            default:
                const idx = findOrdersIndex(meals, String(discount.meal));
                if(idx === -1){
                    break;
                }
                nominal = Number(meals[idx].price) * Number(discount.nominal);
                break;
        }
        nominal = roundNumber(nominal);
        return [true, nominal, discount];
    }catch(error){
        console.log(error);
        return [false, 0, ""];
    }
}
module.exports.calculateDiscount = calculateDiscount;

const roundNumber = (nominal) => {
    nominal = Number((Number(nominal)*100).toPrecision(15) );
    nominal = Math.round(nominal) / 100;
    return nominal;
}

const totalTransactioins = (orders, meals, type) => {
    let nominal = 0;
    for(let i=0; i<meals.length; ++i){
        if(String(meals[i].type).toUpperCase() === String(type).toUpperCase() ){
            nominal += Number(meals[i].price) * Number(orders[i].quantity);
        }
    }
    return nominal;
}

const findOrdersIndex = (meals, meal) => {
    for(let i=0; i<meals.length; ++i){
        if(String(meals[i]._id) === meal){
            return i;
        }
    }
    return -1;
}