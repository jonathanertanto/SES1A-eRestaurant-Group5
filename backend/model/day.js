var mongoose = require ("mongoose");
const tableSchema = require ("./table").schema;

var daySchema = new mongoose.Schema ({
    date: {
        type: Date,
        required: true
    },
    tables: [tableSchema]
});

var Day = mongoose.model ("Day", daySchema);

module.exports.model = Day;
module.exports.schema =daySchema;