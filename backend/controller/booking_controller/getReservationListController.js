var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require('../../model/User');
const User = mongoose.model("User");
const Table = require ("../../model/table").model;
require ("../../model/Reservation");
const Reservation = mongoose.model("Reservation");
require('../../model/Meal');
const Meal = mongoose.model("Meal");
require ("../../model/Order");
const Order = mongoose.model("Order");

router.post("/", async (req, res) => {
    try{
        const reservationList = [];
        const reservations = await Reservation.find({});
        for(let i=0; i<reservations.length; ++i){
            const table = await Table.findOne({_id: String(reservations[i].table)});
            const reservationType = new Date(String(table.date)).getHours() >= 18? "Dinner":"Lunch";
            const areSameType = String(req.body.type).toUpperCase() === "ALL" || reservationType.toUpperCase() === String(req.body.type).toUpperCase();
            const areSameLocation = String(req.body.location).toUpperCase() === "ALL LOCATIONS" || String(table.location).toUpperCase() === String(req.body.location).toUpperCase();
            if(areSameType && areSameLocation){
                const customer = await User.findOne({_id: String(reservations[i].user)});
                const booking = {
                    customer: customer,
                    reservation: reservations[i],
                    table: table
                };
                reservationList.push(booking);
            }
        }

        if(reservationList.length <= 0){
            console.log("No reservation found on the database!");
            return res.status(400).json({
                reservations: ""
            })
        }
        return res.status(200).json({
            reservations: reservationList
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({
            reservations: ""
        })
    }
});
module.exports = router;