var express = require ("express");
var router = express.Router();
var mongoose = require ("mongoose");

require ("../../model/Reservation");
const Reservation = mongoose.model("Reservation");
const Table = require ("../../model/table").model;
require('../../model/Meal');
const Meal = mongoose.model("Meal");
require ("../../model/Order");
const Order = mongoose.model("Order");
const calculateDiscount = require("../discount_controller/calculateDiscountController").calculateDiscount;

router.post("/", async (req, res) => {
    try{
        let tables;
        if(String(req.body.location).toUpperCase() === "ALL LOCATIONS"){
            tables = await Table.find({}).sort([['date', 1]]);
        }else{
            tables = await Table.find({location: String(req.body.location)}).sort([['date', 1]]);
        }

        const periods = [];
        const revenue = [];
        const profit = [];
        periods.push("");
        revenue.push(0);
        profit.push(0);

        let filterStartDate = new Date(String(req.body.startDate));
        filterStartDate = new Date(filterStartDate.getFullYear(), filterStartDate.getMonth(), filterStartDate.getDate());
        let filterEndDate = new Date(String(req.body.endDate));
        filterEndDate = new Date(filterEndDate.getFullYear(), filterEndDate.getMonth(), filterEndDate.getDate());
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let temp;
        switch(String(req.body.timeInterval).toUpperCase()){
            case "DAILY":
                temp = filterStartDate;
                while(temp.getTime() <= filterEndDate.getTime()){
                    periods.push(temp.getDate() + " " + months[temp.getMonth()] + " " + temp.getFullYear());
                    const data = await setData(temp, tables, "DAILY");
                    revenue.push(data[0]);
                    profit.push(data[0]-data[1]);
                    temp.setDate(temp.getDate() + 1);
                }
                break;
            case "WEEKLY":
                temp = new Date(filterStartDate.getFullYear(), filterStartDate.getMonth(), (filterStartDate.getDate() - filterStartDate.getDay() + 1));
                let endDate = new Date(filterEndDate.getFullYear(), filterEndDate.getMonth(), (filterEndDate.getDate() - filterStartDate.getDay() + 1));
                while(temp.getTime() <= endDate.getTime()){
                    periods.push(temp.getDate() + "-" + (temp.getDate()+6) + " " + months[temp.getMonth()] + " " + temp.getFullYear());
                    const data = await setData(temp, tables, "WEEKLY");
                    revenue.push(data[0]);
                    profit.push(data[0]-data[1]);
                    temp.setDate(temp.getDate() + 7);
                }
                break;
            case "MONTHLY":
                temp = new Date(filterStartDate.getFullYear(), filterStartDate.getMonth(), 1);
                while(temp.getTime() <= filterEndDate.getTime()){
                    periods.push(months[temp.getMonth()] + " " + temp.getFullYear());
                    const data = await setData(temp, tables, "MONTHLY");
                    revenue.push(data[0]);
                    profit.push(data[0]-data[1]);
                    temp.setMonth(temp.getMonth() + 1);
                }
                break;
            default:
                temp = new Date(filterStartDate.getFullYear(), 1, 1);
                for(let i=filterStartDate.getFullYear(); i<=filterEndDate.getFullYear(); ++i){
                    periods.push(i);
                    const data = await setData(temp, tables, "YEARLY");
                    revenue.push(data[0]);
                    profit.push(data[0]-data[1]);
                }
                break;
        }
        return res.status(200).json({status: true, periods: periods, revenue: revenue, profit: profit});
    }catch(error){
        console.log(error);
        res.status(400).json({status: false});
    }
});
module.exports = router;

const setData = async (temp, tables, type) => {
    let nominal = 0;
    let cost = 0;

    for(let i=0; i<tables.length; ++i){
        const reservation = await Reservation.findOne({table: String(tables[i]._id)});
        if(!reservation.completeness){
            continue;
        }
        let tableDate = new Date(String(tables[i].date));
        switch(String(type).toUpperCase()){
            case "DAILY":
                tableDate = new Date(tableDate.getFullYear(), tableDate.getMonth(), tableDate.getDate());
                break;
            case "WEEKLY":
                tableDate = new Date(tableDate.getFullYear(), tableDate.getMonth(), tableDate.getDate());
                if(tableDate.getDay() !== 1){
                    tableDate = new Date(tableDate.getFullYear(), tableDate.getMonth(), (tableDate.getDate() - tableDate.getDay() + 1));
                }
                break;
            case "MONTHLY":
                tableDate = new Date(tableDate.getFullYear(), tableDate.getMonth(), 1);
                break;
            default:
                tableDate = new Date(tableDate.getFullYear(), 1, 1);
                break;
        }
        if(tableDate.getTime() === temp.getTime()){
            const orders = await Order.find({reservation: String(reservation._id)});
            const meals = [];
            for(let j=0; j<orders.length; ++j){
                const meal = await Meal.findOne({_id: String(orders[j].meal)});
                if(!meal){
                    continue;
                }
                nominal += (Number(orders[j].quantity) * Number(meal.price));
                cost += (Number(orders[j].quantity) * Number(meal.cost));
                meals.push(meal);
            }
            if(orders.length > 0 && meals.length > 0){
                const discountValue = await calculateDiscount(reservation.discount, orders, meals, nominal);
                cost += discountValue[1];
            }
        }
    }
    return [nominal, cost];
}