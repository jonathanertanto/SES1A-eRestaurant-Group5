var express = require ("express");
var router = express.Router();
const mongoose = require ("mongoose");

const Day = require ("../../model/day").model;
// const Reservation = require ("../../model/reservation");
const Reservation = require ("../../model/booking");

//Used for testing whether I could connect to a REST API using Postman (an app for receiving these requests)
/*
router.get("/", function (req,res,next){
    res.status(200).send("Allg");
    
});
*/

router.post ("/", (req,res,next) => {
    Day.find({date: req.body.date }, (err,days) => {
        if (!err){
            if (days.length > 0) {
                let days = days[0];
                day.tables.forEach (table => {
                    //making sure that the table is indeed the correct table
                    if (table._id == req.body.table){
                        // table.reservation = new Reservation ({
                        //     name: req.body.name,
                        //     phone: req.body.phone,
                        //     email: req.body.email
                        // });
                        table.reservation = new Reservation({
                            number_of_people: req.body.party_size,
                            notes: req.body.notes
                        });
                        table.isAvailable = false;   //table has now been reserved and is no longer available
                        day.save(err => {
                            if (err) {
                                console.log (err);
                            } else {
                                console.log ("Reserved");
                                res.status(200).send("Added Reservation");
                            }
                        });
                    }
                });
            } else {
                console.log ("Day not found");
            }
        }
    });
});

module.exports = router;