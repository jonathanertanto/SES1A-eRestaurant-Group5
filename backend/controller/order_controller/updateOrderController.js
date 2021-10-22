const express = require ("express");
const router = express.Router();
const Order = require ("../../model/Order").model;
const Discount = require ("../../model/Discount").model;
const Reservation = require ("../../model/reservation").model;

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
            }
        });
        if(req.body.discountID !== ""){
            const discount = await Discount.findOne({_id: String(req.body.discountID)});
            if(discount){
                if(!req.body.min_transaction ){
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
        return res.status(200).json({status: true, message: "Successfully updated the order's information!"});
    }catch(error){
        console.log(error);
        return res.status(400).json({status: false, message: err});
    }
});
module.exports = router;