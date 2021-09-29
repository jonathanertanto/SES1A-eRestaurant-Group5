var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

const Day = require ("../../model/day").model;
const Table = require ("../../model/table").model;
require ("../../model/reservation");
const Reservation = mongoose.model("Reservation");

router.post("/", async (req, res) => {
    try{
        Reservation.deleteOne({_id: String(req.body.reservation)}, (err) => {
            if(err){
                console.log(err);
                return res.status(200).json({status: false});
            }else{
                console.log("Successfully deleted the reservation from database");
            }
        });
        Table.deleteOne({_id: String(req.body.table)}, (err) => {
            if(err){
                console.log(err);
                return res.status(200).json({status: false});
            }else{
                console.log("Successfully deleted the table from database");
            }
        });
        Day.updateOne({date: Date.parse(String(req.body.date)), "tables._id": String(req.body.table)}, {
            $set: {
                "tables.$.isAvailable": true
            }
        }, (err) => {
            if(err){
                console.log(err);
                return res.status(200).json({status: false});
            }else{
                console.log("Successfully change table status to available");
            }
        });
        return res.status(200).json({status: true});
    }catch(error){
        console.log(error);
    }
});
module.exports = router;