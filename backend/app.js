const path = require('path');
const logger = require("morgan");
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const router = express.Router();
const app = express();
require ("dotenv").config();
const port = process.env.PORT || 3001;

//-----EXPRESS-----
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//-----DATABASE SETUP-----
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true});

//-----USER-----
app.use("/api/createadmin", require("./controller/user_controller/createAdminController"));
app.use("/api/login", require("./controller/user_controller/loginController"));
app.use("/api/signup", require("./controller/user_controller/signUpController"));
app.use("/api/profile", require("./controller/user_controller/getProfileController"));
app.use("/api/updateuser", require("./controller/user_controller/updateUserController"));
app.use("/api/deleteuser", require("./controller/user_controller/deleteUserController"));
app.use("/api/getaccountlist", require("./controller/user_controller/getAccountListController"));

//-----BOOKING-----
app.use("/availability", require ("./controller/booking_controller/availabilityController"));
app.use("/reserve", require ("./controller/booking_controller/reservationController"));
app.use("/api/getreservation", require("./controller/booking_controller/getReservationController"));
app.use("/api/cancelreservation", require("./controller/booking_controller/cancelReservationController"));
app.use("/api/getreservationlist", require("./controller/booking_controller/getReservationListController"));
app.use("/api/setbookingcompleteness", require("./controller/booking_controller/setBookingCompletenessController"));

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
app.use("/api/calculatediscount", require("./controller/discount_controller/calculateDiscountController"));
app.use("/api/canceldiscount", require("./controller/discount_controller/cancelDiscountController"));

//-----FINANCIAL REPORTS-----
app.use("/api/getfinancialreport", require("./controller/financial_report_controller/getFinancialReportController"));

//-----RANDOM DIRECTORY-----
app.get('/', (req, res) => {
    res.send("Test");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () =>{
    console.log(`Server started on port ${port}.`);
});

module.exports = app;