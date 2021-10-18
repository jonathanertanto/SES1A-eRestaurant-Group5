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
            if(returnData.length === 0){
                return res.status(400).json({status: false});
            }
            console.log("Discounts successfully retrieved!");
            return res.status(200).json({status: true, discounts: returnData.sort((a, b) => (a._id < b._id) ? -1 : 1)});
        }
        console.log("There is no discount existed in the database!");

        //Codes below are just for demonstration purpose only. In imlementation, managers will have too add the discount offers manually!
            const year = new Date().getFullYear();
            const data = {
                start_date: [`${year}-09-20`, `${year}-10-20`, `${year}-09-30`, `${year}-09-30`,`${year}-09-25`, `${year}-10-01`, `${year}-09-30`],
                end_date: [`${year}-09-30`,`${year}-10-30`, `${year}-10-30`, `${year}-10-30`, `${year}-10-30`, `${year}-11-10`, `${year}-11-01`],
                description: ["Discount 20% on foods only", "Discount 5% on all meals", "Discount $5 on all meals", "Discount $10 on drinks only", "Free 1 quantity of Drink 1", "Discount $10 on Meal 1", "Discount 25% on Meal 1"],
                min_transaction: [40, 20, 20, 0, 50, 0, 0],
                nominal: [20, 5, 5, 10, 1, 10, 25],
                type: ["P", "P", "N", "N", "Q", "N", "P"],
                meal: ["", "", "", "", "616d660b5603d83fdb4db45a", "616d660b5603d83fdb4db455", "616d660b5603d83fdb4db455"],
                menuType: ["A", "A", "L", "D", "A", "A", "A"],
                mealType: ["F", "A", "A", "D", "D", "F", "F"]
            }
            const newDiscounts = [];
            for(let i=0; i<7; ++i){
                const discount = new Discount({
                    start_date: Date.parse(data.start_date[i]),
                    end_date: Date.parse(data.end_date[i]),
                    image: "https://images-platform.99static.com//7KDsGEKIlvsm2Sg1KamPTF_Krvc=/0x0:8333x8333/fit-in/500x500/projects-files/57/5734/573438/2eee4b82-22e6-4fca-8a97-6aa05c13fda6.jpg",
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
            return res.status(200).json({status: true, discounts: newDiscounts});
        // End of Comment
    }catch(error){
        console.log(error);
        return res.status(400).json({status: false});
    }
});
module.exports = router;