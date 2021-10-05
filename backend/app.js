const path = require('path');
const logger = require("morgan");
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3001;
const cookieParser = require('cookie-parser');
const router = express.Router();

const app = express();
require ("dotenv").config();

//-----EXPRESS-----
app.use(express.static(path.resolve(__dirname, '../index.js')));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//-----DATABASE SETUP-----
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/LeBistrotdAndreDB", {useNewUrlParser: true});
mongoose.connection.on("connected", () =>{
    console.log("Successfully connected!");
});
mongoose.connection.on("error",(err) => {
    console.log(err);
})

//-----USER-----
app.use("/api/login", require("./controller/user_controller/loginController"));
app.use("/api/signup", require("./controller/user_controller/signUpController"));
app.use("/api/profile", require("./controller/user_controller/getProfileController"));
app.use("/api/updateuser", require("./controller/user_controller/updateUserController"));
app.use("/api/deleteuser", require("./controller/user_controller/deleteUserController"));

//-----BOOKING-----
app.use("/availability", require ("./controller/booking_controller/availabilityController"));
app.use("/reserve", require ("./controller/booking_controller/reservationController"));
app.use("/api/getreservation", require("./controller/booking_controller/getReservationController"));
app.use("/api/cancelreservation", require("./controller/booking_controller/cancelReservationController"));

//-----MENU-----
app.use("/api/addmeal", require("./controller/menu_controller/addMealController"));
app.use("/api/getallmeals", require("./controller/menu_controller/getMenuController"));
app.use("/api/deleteallmeal", require("./controller/menu_controller/deleteMenuController"));
app.use("/api/gettestingmenu", require("./controller/menu_controller/getTestingMenuController"));

//-----ORDER-----
app.use("/api/ordermeal", require("./controller/order_controller/orderMealController"));
app.use("/api/getorders", require("./controller/order_controller/getOrdersController"));
app.use("/api/updateorder", require("./controller/order_controller/updateOrderController"));
app.use("/api/removeorder", require("./controller/order_controller/removeOrderController"));

//-----DISCOUNTS-----
app.use("/api/getdiscounts", require("./controller/discount_controller/getDiscountsController"));
app.use("/api/applydiscount", require("./controller/discount_controller/applyDiscountController"));

//-----RANDOM DIRECTORY-----
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.js'));
});

app.listen(port, () =>{
    console.log(`Server started on port ${port}.`);
});

module.exports = app;