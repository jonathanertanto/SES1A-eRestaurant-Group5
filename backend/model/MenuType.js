const mongoose = require('mongoose');

const menuTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Menu type cannot be empty!"]
    }
});

module.exports.model = mongoose.model("MenuType", menuTypeSchema);