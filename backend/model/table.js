const mongoose = require ("mongoose");

const tableSchema = new mongoose.Schema ({
    name: String,
    capacity: Number,
    isAvailable: Boolean,
    location: String,
    date: Date
});

module.exports.model = mongoose.model("Table", tableSchema);
module.exports.schema = tableSchema;