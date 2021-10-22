const express = require ("express");
const router = express.Router();
const Table = require ("../../model/table").model;
const Reservation = require ("../../model/reservation").model;

router.post("/", async (req, res) => {
    try{
        const reservations = await Reservation.find({user: String(req.body.userID)});
        let table;
        for(let i=0; i<reservations.length; ++i){
            table = await Table.findOne({_id: String(reservations[i].table)});
            if(table.date >= new Date()){
                console.log("An active reservation founded: " + String(table._id));
                return res.status(200).json({
                    reservation: reservations[i],
                    table: table
                });
            }
        }
        return res.status(200).json({
            reservation: "",
            table: ""
        });
    }catch(error){
        console.log(error);
        return res.status(400).json({
            reservation: "",
            table: ""
        });
    }
});

module.exports = router;