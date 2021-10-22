const express = require ("express");
const router = express.Router();
const Reservation = require ("../../model/reservation").model;

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