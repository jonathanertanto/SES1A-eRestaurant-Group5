var express = require ("express");
var router = express.Router();
const mongoose = require ("mongoose");

const Day = require ("../../model/day").model;
const Table = require ("../../model/table").model;
require ("../../model/reservation");
const Reservation = mongoose.model("Reservation");

//Used for testing whether I could connect to a REST API using Postman (an app for receiving these requests)
/*
router.get("/", function (req,res,next){
    res.status(200).send("Allg");
    
});
*/

router.post ("/", (req,res,next) => {
    // Day.find({date: req.body.date }, (err,days) => {
    //     if (!err){
    //         if (days.length > 0) {
    //             let day = days[0];
    //             day.tables.forEach (table => {
    //                 //making sure that the table is indeed the correct table
    //                 if (table._id == req.body.table){
    //                     table.reservation = new Reservation({
    //                         number_of_people: req.body.party_size,
    //                         notes: req.body.notes
    //                     });
    //                     table.isAvailable = false;   //table has now been reserved and is no longer available
    //                     day.save(err => {
    //                         if (err) {
    //                             console.log (err);
    //                         } else {
    //                             console.log ("Reserved");
    //                             return res.status(200).send("Added Reservation");
    //                         }
    //                     });
    //                 }
    //             });
    //         } else {
    //             console.log ("Day not found");
    //         }
    //     }
    // });
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