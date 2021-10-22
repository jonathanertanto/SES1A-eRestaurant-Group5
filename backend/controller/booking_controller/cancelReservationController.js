const express = require ("express");
const router = express.Router();
const Day = require ("../../model/day").model;
const Table = require ("../../model/table").model;
const Reservation = require ("../../model/reservation").model;
const Order = require ("../../model/Order").model;

router.post("/", async (req, res) => {
    try{
        Order.deleteMany({_reservation: String(req.body.reservation)}, (err) => {
            if(err){
                console.log(err);
                return res.status(400).json({status: false});
            }else{
                console.log("Successfully deleted the reservation's meal order(s)!");
            }
        })
        Reservation.deleteOne({_id: String(req.body.reservation)}, (err) => {
            if(err){
                console.log(err);
                return res.status(200).json({status: false});
            }else{
                console.log("Successfully deleted the reservation from database!");
            }
        });
        Table.deleteOne({_id: String(req.body.table)}, (err) => {
            if(err){
                console.log(err);
                return res.status(400).json({status: false});
            }else{
                console.log("Successfully deleted the table from database!");
            }
        });
        Day.updateOne({date: Date.parse(String(req.body.date)), "tables._id": String(req.body.table)}, {
            $set: {
                "tables.$.isAvailable": true
            }
        }, (err) => {
            if(err){
                console.log(err);
                return res.status(400).json({status: false});
            }else{
                console.log("Successfully change table status to available!");
            }
        });
        return res.status(200).json({status: true});
    }catch(error){
        console.log(error);
        return res.status(400).json({status: false});
    }
});
module.exports = router;