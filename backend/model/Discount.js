const mongoose = require('mongoose');

const DiscountSchema = new mongoose.Schema({
    start_date: {
        type: Date,
        required: [true, "Without start date, the discounts will not be displayed on the system!"]
    },
    end_date: Date,
    image: String,
    name: String,
    description: String,
    min_transaction: Number,
    method_of_use: String,
    nominal: {
        type: Number,
        required: [true, "Discount should includes a quantity!"]
    },
    type: {
        type: String,
        required: [true, "Discount should has a type: a percentage, nominal, free"],
        maxLength: 1
    },
    meal: String,
    menuType:{
        type: String,
        required: [true, "Discount can be only applied for lunch or dinner only, but also can be used for both"]
    },
    mealType:{
        type: String,
        required: [true, "Discount can be only applied for foods or drinks only, but also can be used for both"]
    }
});

mongoose.model("Discount", DiscountSchema);