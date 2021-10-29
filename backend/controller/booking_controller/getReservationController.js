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
            if(new Date(table.date) >= getCurrentDate()){
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

const getCurrentDate = _ => {
    const date = new Date();
    const day = (date.getDate() < 10 && "0") + date.getDate();
    const month = (date.getMonth()+1 < 10 && "0") + date.getMonth()+1;
    const year = date.getFullYear();
    const hour = (date.getHours() < 10 && "0") + date.getHours();
    const min = (date.getMinutes() < 10 && "0") + date.getMinutes();
    const sec = (date.getSeconds() < 10 && "0") + date.getSeconds();
    return (new Date(year + "-" + month + "-" + day + "T" + hour + ":" + min + ":"+ sec + ".000Z"));
}

module.exports = router;