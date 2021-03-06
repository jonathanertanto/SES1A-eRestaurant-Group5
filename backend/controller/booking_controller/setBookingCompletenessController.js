const express = require ("express");
const router = express.Router();
const Reservation = require ("../../model/reservation").model;

router.post("/", async (req, res) => {
    try{
        Reservation.updateOne({_id: String(req.body.reservationID)}, {
            completeness: String(req.body.status) === "true" ? true : false
        }, async (err) => {
            if(err){
                console.log(err);
                return res.status(400).json({status: false, message: err});
            }
        });
        console.log("Successfully updated reservation completeness status");
        return res.status(200).json({status: true, message: "Successfully updated reservation completeness status"});
    }catch(err){
        console.log(err);
        return res.status(400).json({status: false, message: err});
    }
});
module.exports = router;