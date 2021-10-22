const express = require ("express");
const router = express.Router();
const Day = require ("../../model/day").model;
const Table = require ("../../model/table").model;
const Reservation = require ("../../model/reservation").model;

router.post ("/", (req, res) => {
    try{
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
    }catch(error){
        console.log(error);
    }
});

module.exports = router;