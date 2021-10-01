var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require ("../../model/Order");
const Order = mongoose.model("Order");

router.post("/", async (req, res) => {
    try{
        const order = await Order.findOne({_id: String(req.body.orderID)});
        if(!order){
            console.log("Invalid order!");
            return res.status(400).json({status: false, message: "Order not found!"});
        }
        Order.updateOne({_id: String(req.body.orderID)}, {
            quantity: Number(req.body.quantity),
            notes: String(req.body.notes)
        }, async (err) => {
            if(err){
                console.log(err);
                return res.status(400).json({status: false, message: err});
            }else{
                console.log("Successfully updated the order's information!");
                return res.status(200).json({status: true, message: "Successfully updated the order's information!"});
            }
        });
    }catch(error){
        console.log(error);
    }
});
module.exports = router;