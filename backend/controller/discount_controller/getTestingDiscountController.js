var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/Discount');
const Discount = mongoose.model("Discount");

router.post("/", async (req, res) => {
    try{
        let discounts = await Discount.find({});
        if(discounts.length > 0){
            console.log("There is already discounts existed!");
            console.log("Successfully retrieve discounts!");
            const temp = await Discount.find({"users": String(req.body.userID)});
            if(temp.length <= 0)
                return res.json({discounts: discounts});
        }
        console.log("There is no discount existed in the database!");
        const year = new Date().getFullYear();
        const data = {
            start_date: [`${year}-09-20`, `${year}-10-20`, `${year}-09-30`, `${year}-09-30`, `${year}-09-30`],
            end_date: [`${year}-09-30`,`${year}-10-30`, `${year}-10-30`, `${year}-10-30`, `${year}-10-30`],
            description: ["Discount 20%", "Discount 5%", "Discount $5", "Discount $10 on drinks", "Free Drink 1"],
            min_transaction: [40, 20, 20, 0, 50],
            nominal: [20, 5, 5, 10, 0],
            type: ["P", "P", "N", "N", "F"],
            meal: ["", "", "", "", "615603c46ba5684e703fd31f"],
            menuType: ["A", "L", "D", "A", "A"]
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
                menuType: data.menuType[i]
            });
            discount.save();
            newDiscounts.push(discount);
            console.log(`Successfully saved discount: ${discount.name}`);
        }
        return res.json({discounts: newDiscounts});
    }catch(error){
        console.log(error);
    }
});
module.exports = router;