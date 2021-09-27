var mongoose = require ("mongoose");

var tableSchema = new mongoose.Schema ({
    name: String,
    capacity: Number,
    isAvailable: Boolean,
    location: String,
    date: Date
});

var Table = mongoose.model("Table", tableSchema);

module.exports.model = Table;
module.exports.schema = tableSchema;