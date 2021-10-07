var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require ("../../model/Order");
const Order = mongoose.model("Order");

require ("../../model/Discount");
const Discount = mongoose.model("Discount");

require ("../../model/Reservation");
const Reservation = mongoose.model("Reservation");

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
                }
            });
        }else{
            Order.deleteOne({_id: String(req.body.orderID)}, (err) => {
                if(err){
                    console.log(err);
                    return res.status(400).json({status: false, message: err});
                }else{
                    console.log("Successfully canceled meal order!");
                }
            });
        }
        if(req.body.discountID !== ""){
            const discount = await Discount.findOne({_id: String(req.body.discountID)});
            if(discount){
                if(discount.meal === order.meal || !req.body.min_transaction ){
                    Reservation.updateOne({_id: order.reservation}, {discount: ""}, async (err) => {
                        if(err){
                            console.log(err);
                            return res.status(400).json({status: false, message: err});
                        }else{
                            console.log("Discount successfully cancelled!");
                        }
                    });
                }
            }
        }
        return res.status(200).json({status: true, message: "Successfully canceled meal order!"});
    }catch(error){
        console.log(error);
        return res.status(400).json({status: false, message: error});
    }
});
module.exports = router;