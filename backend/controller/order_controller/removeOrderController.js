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
        if(order.quantity < Number(req.body.quantity)){
            console.log("Invalid quantity!");
            return res.status(400).json({status: false, message: "Inputted quantity cannot be larger than the order quantity!"});
        }else if(order.quantity > Number(req.body.quantity)){
            Order.updateOne({_id: String(req.body.orderID)}, {
                quantity: (order.quantity - Number(req.body.quantity))
            }, async (err) => {
                if(err){
                    console.log(err);
                    return res.status(400).json({status: false, message: err});
                }else{
                    console.log("Successfully updated the order's quantity!");
                    return res.status(200).json({status: true, message: "Successfully updated the order's quantity!"});
                }
            });
        }else{
            Order.deleteOne({_id: String(req.body.orderID)}, (err) => {
                if(err){
                    console.log(err);
                    return res.status(400).json({status: false, message: err});
                }else{
                    console.log("Successfully canceled meal order!");
                    return res.status(200).json({status: true, message: "Successfully canceled meal order!"});
                }
            });
        }
    }catch(error){
        console.log(error);
    }
});
module.exports = router;