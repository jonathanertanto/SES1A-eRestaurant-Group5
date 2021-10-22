const mongoose = require ("mongoose");
const tableSchema = require ("./table").schema;

const daySchema = new mongoose.Schema ({
    date: {
        type: Date,
        required: true
    },
    tables: [tableSchema]
});

module.exports.model = mongoose.model ("Day", daySchema);