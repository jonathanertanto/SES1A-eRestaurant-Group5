const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    restaurant: String
});

module.exports.model = mongoose.model("Staff", staffSchema);