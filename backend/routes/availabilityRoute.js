var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

const Day = require("../models/day").model;

router.post("/", function (req, res, next) {
    console.log ("Request attempted");

    console.log (req.body);
    const dateTime = new Date(req.body.date);

    Day.find({date: dateTime }, (err, docs) => {
        if (!err){
            if (docs.length > 0 ){
                //the Record already exists
                console.log ("Record exists. Sent docs");
                res.status(200).send(docs[0]);
            } else {
                //the searched date does not yet exists and we therefore need to create it
                const allTables = require("../data/allTables");
                const day = new Day ({
                    date: dateTime,
                    tables: allTables
                });
                day.save(err => {
                    if (err){
                        res.status(400).send ("Error has occurred while trying to save the new date");
                    } else {
                        //The date  has been saved and all the tables have to be returned, since they are now all available
                        console.log ("Created a new dateTime. Here are the default docs");
                        Day.find ({ date: dateTime }, (err, docs) => {
                            if (err) {
                                res.sendStatus(400);
                            } else {
                                res.stattus(200).send(docs[0]);
                            }
                        });
                    }
                });
            }
        } else {
            res.status(400).send ("Could not search for date");
        }
    })
    
});

module.exports = router;
