var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require ("../../model/Reservation");
const Reservation = mongoose.model("Reservation");

router.post("/", async (req, res) => {
    try{
        Reservation.updateOne({_id: req.body.reservationID}, {discount: ""}, async (err) => {
            if(err){
                console.log(err);
                return res.status(400).json({status: false, message: err});
            }else{
                console.log("Discount successfully cancelled!");
                return res.status(200).json({status: true, message: "Discount successfully cancelled!"});
            }
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({status: false, message: err});
    }
});
module.exports = router;