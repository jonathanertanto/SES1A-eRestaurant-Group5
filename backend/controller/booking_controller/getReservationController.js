var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

const Table = require ("../../model/table").model;
require ("../../model/Reservation");
const Reservation = mongoose.model("Reservation");

router.post("/", async (req, res) => {
    try{
        const reservations = await Reservation.find({user: String(req.body.userID)});
        let table;
        for(let i=0; i<reservations.length; ++i){
            table = await Table.findOne({_id: String(reservations[i].table)})
            if(table.date >= new Date()){
                console.log("An active reservation founded: " + String(table._id));
                return res.status(200).json({
                    booking: reservations[i],
                    table: table
                });
            }
        }
        return res.status(200).json({
            booking: "",
            table: ""
        });
    }catch(error){
        console.log(error);
    }
});

module.exports = router;