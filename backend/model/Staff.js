const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    restaurant: String
});

mongoose.model("Staff", staffSchema);