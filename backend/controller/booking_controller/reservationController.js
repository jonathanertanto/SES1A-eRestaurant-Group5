var express = require ("express");
var router = express.Router();
const mongoose = require ("mongoose");

const Day = require ("../../model/day").model;
const Table = require ("../../model/table").model;
require ("../../model/Reservation");
const Reservation = mongoose.model("Reservation");

//Used for testing whether I could connect to a REST API using Postman (an app for receiving these requests)
/*
router.get("/", function (req,res,next){
    res.status(200).send("Allg");
    
});
*/

router.post ("/", (req,res,next) => {
    Day.updateOne({date: Date.parse(String(req.body.date)), "tables._id": String(req.body.table.id)}, {
        $set: {
            "tables.$.isAvailable": false
        }
    }, (err) => {
        if(err){
            console.log(err);
        }else{
            console.log("Reservation table on days collection reserved!");
            // Insert table reservation
            const table = new Table({
                _id: String(req.body.table.id),
                name: String(req.body.table.name),
                capacity: Number(req.body.table.capacity),
                isAvailable: false,
                location: String(req.body.location),
                date: Date.parse(String(req.body.date))
            });
            table.save();
            console.log("Table saved!");
            
            // Insert reservation details
            const reservation = new Reservation({
                number_of_people: Number(req.body.size),
                notes: String(req.body.notes),
                discount: "",
                completeness: false,
                table: String(req.body.table.id),
                user: String(req.body.userID)
            });
            reservation.save();
            console.log("Reservation saved!");
            return res.status(200).send("Added Reservation");
        }
    })
});

module.exports = router;