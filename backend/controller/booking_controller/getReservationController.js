var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

const Table = require ("../../model/table").model;
require ("../../model/reservation");
const Reservation = mongoose.model("Reservation");

router.post("/", async (req, res) => {
    try{
        Reservation.find({user: String(req.body.userID)}).sort([['_id', -1]]).exec((err, reservations) => {
            if(err){
                return console.log(err);
            }else{
                reservations.forEach(reservation => {
                    Table.findOne({_id: String(reservation.table)}, (err2, table) => {
                        if(table.date >= new Date()){
                            console.log("An active reservation founded: " + String(table._id));
                            return res.status(400).json({
                                booking: reservation,
                                table: table
                            });
                        }
                    });
                });
            }
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            booking: ""
        });
    }
});

module.exports = router;