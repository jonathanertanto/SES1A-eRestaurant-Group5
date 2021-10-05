var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/Discount');
const Discount = mongoose.model("Discount");
require('../../model/Reservation');
const Reservation = mongoose.model("Reservation");

router.post("/", async (req, res) => {
    try{
        let discounts = await Discount.find({});
        if(discounts.length > 0){
            console.log("There is already discounts existed!");
            console.log("Successfully retrieve discounts!");
            const returnData = [];
            for(let i=0; i<discounts.length; ++i){
                let temp = await Reservation.findOne({user: String(req.body.userID), discount: String(discounts[i]._id)});
                if(temp === null){
                    returnData.push(discounts[i]);
                }
            }
            console.log("Discounts successfully retrieved!");
            return res.json({discounts: returnData});
        }
        console.log("There is no discount existed in the database!");
        //Codes below are just for demonstration purpose only. In imlementation, managers will have too add the discount offers manually!
        const year = new Date().getFullYear();
        const data = {
            start_date: [`${year}-09-20`, `${year}-10-20`, `${year}-09-30`, `${year}-09-30`, `${year}-09-30`],
            end_date: [`${year}-09-30`,`${year}-10-30`, `${year}-10-30`, `${year}-10-30`, `${year}-10-30`],
            description: ["Discount 20% on foods only", "Discount 5% on all meals", "Discount $5 on all meals", "Discount $10 on drinks only", "Free 1 quantity of Drink 1"],
            min_transaction: [40, 20, 20, 0, 50],
            nominal: [20, 5, 5, 10, 1],
            type: ["P", "P", "N", "N", "Q"],
            meal: ["", "", "", "", "615603c46ba5684e703fd31f"],
            menuType: ["A", "A", "L", "D", "A"],
            mealType: ["F", "A", "A", "D", "D"]
        }
        const newDiscounts = [];
        for(let i=0; i<5; ++i){
            const discount = new Discount({
                start_date: Date.parse(data.start_date[i]),
                end_date: Date.parse(data.end_date[i]),
                image: "",
                name: String(`Discount ${(i+1)}`),
                description: data.description[i],
                min_transaction: data.min_transaction[i],
                method_of_use: "",
                nominal: data.nominal[i],
                type: data.type[i],
                meal: data.meal[i],
                menuType: data.menuType[i],
                mealType: data.mealType[i]
            });
            discount.save();
            newDiscounts.push(discount);
            console.log(`Successfully saved discount: ${discount.name}`);
        }
        return res.json({discounts: newDiscounts});
        // End of Comment
    }catch(error){
        console.log(error);
    }
});
module.exports = router;