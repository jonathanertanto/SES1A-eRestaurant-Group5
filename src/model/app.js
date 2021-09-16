const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./user');
require('./customer');
require('./booking');

const User = mongoose.model("User");
const Customer = mongoose.model("Customer");
const Booking = mongoose.model("Booking");
mongoose.connect("mongodb://localhost:27017/LeBistrotdAndreDB", {useNewUrlParser: true});

mongoose.connection.on("connected", () =>{
    console.log("Successfully connected!");
});

mongoose.connection.on("error",(err) => {
    console.log(err);
})

app.get('/', (req, res) => {
    res.send("Le Bistrot d'Andre");
})

app.post("/api/signup", async (req, res) => {
    
});

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`Server started on port ${port}.`);
});