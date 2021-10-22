const express = require ("express");
const router = express.Router();
const Order = require ("../../model/Order").model;

router.post("/", async (req, res) => {
    try{
        const order = await Order.findOne({meal: String(req.body.meal), reservation: String(req.body.reservation)});
        if(order){
            Order.updateOne({_id: String(order._id)}, {
                quantity: Number(order.quantity) + Number(req.body.quantity),
                notes: String(order.notes) + String(req.body.notes)
            }, async (err) => {
                if(err){
                    console.log(err);
                    return res.json({
                        status: false
                    })
                }else{
                    console.log("Order successfully added!");
                    return res.json({
                        status: true
                    });
                }
            });
        }else{
            const data = new Order({
                quantity: Number(req.body.quantity),
                notes: String(req.body.notes),
                meal: String(req.body.meal),
                reservation: String(req.body.reservation)
            });
            data.save();
            console.log("Order successfully created!");
            return res.json({
                status: true
            });
        }
    }catch(error){
        console.log(error);
        return res.json({
            status: false
        });
    }
});
module.exports = router;