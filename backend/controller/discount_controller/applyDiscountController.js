var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/Reservation');
const Reservation = mongoose.model("Reservation");
require('../../model/Order');
const Order = mongoose.model("Order");

router.post("/", async (req, res) => {
    try{
        if(req.body.status === true){
            const order = new Order({
                quantity: 1,
                notes: "",
                meal: req.body.mealID,
                reservation: req.body.reservationID
            });
            order.save();
            console.log("Order successfully created!");
        }

        Reservation.updateOne({_id: String(req.body.reservationID)}, {
            discount: String(req.body.discountID)
        }, async (err) => {
            if(err){
                console.log(err);
                return res.status(400).json({status: false, message: err});
            }else{
                console.log("Discount successfully applied!");
                return res.status(200).json({status: true, message: "Discount successfully applied!"});
            }
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({status: false, message: error});
    }
});
module.exports = router;